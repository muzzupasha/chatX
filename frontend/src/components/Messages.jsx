import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  // Messages component that displays a list of chat messages for the selected user. It listens for real-time messages and updates the Redux store accordingly, and automatically scrolls to the latest message when new messages are received.
  useGetRealTimeMessage(); // Custom hook to listen for real-time messages and update the Redux store
  const messages = useSelector((store) => store.user.messages ?? []); // Access the messages from the Redux store, defaulting to an empty array if not available
  const messagesContainer = useRef(null); // Ref to the messages container for scrolling into view

  useEffect(() => {
    // Scroll the messages container to the bottom whenever the messages array changes
    const container = messagesContainer.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  if (!messages) return null;

  return (
    // Render the messages container with a list of Message components for each message in the messages array
    <section
      ref={messagesContainer}
      className="min-h-0 min-w-0 flex-1 overscroll-contain overflow-y-auto overflow-x-hidden px-1 py-4 sm:px-2 sm:py-6"
    >
      <div className="space-y-4">
        {messages.filter(Boolean).map((message) => (
          <Message key={message._id ?? message.id} message={message} />
        ))}
      </div>
    </section>
  );
};

export default Messages;
