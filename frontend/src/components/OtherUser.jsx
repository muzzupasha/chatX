import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ conversation }) => {
  // Component that represents another user in the conversation list, displaying their avatar, name, last message, and online status. It also allows selecting the user to view their messages.

  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user); // Access the selectedUser and onlineUsers from the Redux store
  const selectedId = selectedUser?.id ?? selectedUser?._id;
  const conversationId = conversation?.id ?? conversation?._id; // Get the conversation ID from the conversation object, handling different possible structures
  const isSelected = Boolean(
    // Determine if the current conversation is the selected one by comparing their IDs
    selectedId &&
    conversationId &&
    String(selectedId) === String(conversationId),
  );

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    // Generate a fallback avatar URL using the conversation name, encoding it for use in the URL
    conversation.name ?? "User",
  )}&background=0f766e&color=fff`;

  const isOnline = onlineUsers.some(
    (userId) => String(userId) === String(conversationId),
  ); // Check if the conversation user is online by comparing their ID with the IDs of online users

  const selectedUserHandler = () => {
    // Function to handle selecting a user when the component is clicked, dispatching an action to update the selectedUser in the Redux store
    dispatch(setSelectedUser(conversation));
  };

  return (
    // Render the component with appropriate styling based on whether the user is selected or not, displaying their avatar, name, last message, and online status
    <div
      onClick={selectedUserHandler}
      className={`${isSelected ? "bg-bg-white border-cyan-300/30 shadow-lg" : ""} group flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition duration-300 hover:bg-white/8 hover:border-cyan-300/30 hover:shadow-lg`}
    >
      <div className="relative">
        <img
          className="h-11 w-11 rounded-full object-cover"
          src={conversation.avatar ?? fallbackAvatar}
          alt={conversation.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackAvatar;
          }}
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-slate-300">
            {conversation.name}
          </span>
          <span className="text-[11px] text-slate-500">
            {conversation.time}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="truncate text-xs text-slate-500">
            {conversation.lastMessage}
          </span>
          {conversation.unread > 0 && (
            <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-bold text-slate-950">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
