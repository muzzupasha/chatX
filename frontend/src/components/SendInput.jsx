import React, { useEffect, useRef, useState } from "react";
import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";
import { api } from "../utils/api";
import EmojiPicker from "emoji-picker-react";

const SendInput = () => {
  // SendInput component that provides an input field for typing and sending messages, along with buttons for adding attachments and emojis. It handles the message submission and updates the Redux store with the new message.
  const [message, setMessage] = useState("");
  const { selectedUser, messages } = useSelector((store) => store.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to manage the visibility of the emoji picker.
  const emojiPickerRef = useRef(null); // Ref to the emoji picker element to detect clicks outside of it for closing the picker.

  useEffect(() => {
    // Effect to handle clicks outside the emoji picker to close it when clicking elsewhere on the page.
    if (!showEmojiPicker) return;

    const handleOutsideClick = (event) => {
      if (!emojiPickerRef.current?.contains(event.target)) {
        // Check if the click is outside the emoji picker.
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick); // Add event listener for pointer down events to detect clicks outside the emoji picker.
    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick); // Cleanup the event listener when the component unmounts or when showEmojiPicker changes.
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData) => {
    setMessage((currentMessage) => currentMessage + emojiData.emoji);
  }; // Function to handle the selection of an emoji from the emoji picker and append it to the current message.

  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    // Handle the form submission for sending a message. It prevents the default form submission behavior, checks if a receiver ID and message are present, sends the message to the server via an API call, and updates the Redux store with the new message if successful.
    e.preventDefault();
    const receiverId = selectedUser?.id ?? selectedUser?._id;

    if (!receiverId || !message.trim()) return;

    try {
      const res = await api.post(
        `/api/v1/message/send/${receiverId}`,
        { message },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      const sentMessage = res?.data?.newMessage;

      if (sentMessage) {
        dispatch(setMessages([...(messages ?? []), sentMessage]));
      }
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Render the form for sending messages, including an input field for typing the message, buttons for adding attachments and emojis, and a submit button to send the message. The form is styled with Tailwind CSS classes for layout and appearance.
    <form
      onSubmit={onSubmitHandler}
      className="mt-2 rounded-2xl border border-white/10 bg-[#202c33] px-2 py-2 backdrop-blur-xl sm:mt-4 sm:rounded-[1.5rem] sm:px-3 sm:py-3"
    >
      <div className="flex min-w-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="hidden rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-300 sm:block"
          aria-label="Add attachment"
        >
          <FiPaperclip size={18} />
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          placeholder="Type a message..."
        />

        <div ref={emojiPickerRef} className="relative">
          <button
            type="button"
            className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-300"
            aria-label="Choose emoji"
            aria-expanded={showEmojiPicker}
            onClick={() => setShowEmojiPicker((open) => !open)}
          >
            <FiSmile size={18} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 z-50 mb-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="shrink-0 rounded-full bg-emerald-500 px-3 py-2 font-bold text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-400 sm:px-4"
          aria-label="Send message"
        >
          <span className="flex items-center gap-2">
            <FiSend size={16} />
            <span className="hidden sm:inline">Send</span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SendInput;
