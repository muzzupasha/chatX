import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { setAuthUser, setOnlineUsers, setSocket } from "./redux/userSlice";
import { setActiveSocket } from "./utils/socket";
import { api, API_URL } from "./utils/api";

function App() {
  // Main application component that sets up routing, authentication checks, and socket connections for real-time messaging. It uses Redux for state management and React Router for navigation between different pages (signup, login, home, landing). The component also manages the authentication state and initializes the socket connection for real-time updates on online users.
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const authUserId = authUser?.userId ?? authUser?._id ?? authUser?.id;

  useEffect(() => {
    // Effect hook that runs when the component mounts to check the authentication status of the user and fetch the authenticated user's data from the API. It also initializes the online users state in the Redux store.
    dispatch(setOnlineUsers([]));

    api
      .get("/api/v1/user/me")
      .then((response) => dispatch(setAuthUser(response.data)))
      .catch(() => dispatch(setAuthUser(null)))
      .finally(() => setAuthChecked(true));
  }, [dispatch]);

  useEffect(() => {
    // Effect hook that runs when the authUserId changes to establish a socket connection for real-time updates on online users. It sets up an event listener for the "getOnlineUsers" event emitted by the socket and updates the Redux store with the list of online users. The socket connection is cleaned up when the component unmounts or when authUserId changes.
    if (authUserId) {
      const socket = io(API_URL, {
        query: {
          userId: authUserId,
        },
      });
      setActiveSocket(socket);
      dispatch(setSocket(true));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.off("getOnlineUsers");
        socket.close();
        setActiveSocket(null);
        dispatch(setSocket(false));
      };
    }
  }, [authUserId]);

  return (
    // Render the main application viewport, displaying a loading message while authentication is being checked. Once authentication is verified, it conditionally renders the appropriate routes based on whether the user is authenticated or not. The routes include the home page for authenticated users and the landing page for unauthenticated users, along with signup and login pages.
    <div className="app-viewport w-full overflow-hidden">
      {!authChecked ? (
        <div className="flex h-full items-center justify-center bg-[#f4f8f5] text-sm font-semibold text-[#168c63]">
          Loading your space...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
