import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";
import { api } from "../utils/api";

const useGetMessages = () => {
  // Custom hook to fetch messages for the selected user and update the Redux store with the retrieved messages.
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!selectedUser) return;

    const receiverId = selectedUser.id ?? selectedUser._id; // Get the receiver ID from the selected user object, using either the 'id' or '_id' property.

    const fetchMessages = async () => {
      // Asynchronous function to fetch messages for the selected user from the API.
      try {
        const res = await api.get(`/api/v1/message/${receiverId}`, {
          // Make a GET request to the API endpoint for fetching messages, passing the receiver ID as a parameter.
          withCredentials: true,
        });
        console.log(res);

        const messages = res?.data?.data ?? [];
        dispatch(setMessages(messages));
      } catch (error) {
        if (error?.response?.status === 404) {
          dispatch(setMessages([]));
          return;
        }

        console.log(error);
      }
    };

    fetchMessages();
  }, [dispatch, selectedUser]);
};

export default useGetMessages;
