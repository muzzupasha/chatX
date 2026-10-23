import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";
import { getActiveSocket } from "../utils/socket";

const useGetRealTimeMessage = () => {
  // Custom hook to listen for real-time messages from the socket and update the Redux store with the new messages.
  const { socket, messages } = useSelector((store) => store.user); // Access the socket and messages from the Redux store

  const dispatch = useDispatch();
  const messagesRef = useRef(messages); // Ref to store the current messages array, allowing access to the latest messages in the event listener without needing to include it in the dependency array of useEffect

  messagesRef.current = messages; // Update the ref with the latest messages whenever the messages state changes

  useEffect(() => {
    // Effect hook that runs when the component mounts to set up the socket event listener for new messages
    const activeSocket = getActiveSocket();
    if (!socket || !activeSocket) return;

    const handleNewMessage = (newMessage) => {
      // Event handler for the "newMessage" event emitted by the socket. It updates the Redux store with the new message, appending it to the existing messages array.
      dispatch(setMessages([...(messagesRef.current ?? []), newMessage]));
    };

    activeSocket.on("newMessage", handleNewMessage);
    return () => activeSocket.off("newMessage", handleNewMessage);
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
