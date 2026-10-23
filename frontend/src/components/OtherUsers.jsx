import React from "react";
import { useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = ({ search = "" }) => {
  // Component that displays a list of other users, filtered by the search term, and indicates their online status. It uses a custom hook to fetch the list of other users and updates the Redux store accordingly.
  useGetOtherUsers();
  const otherUsers = useSelector((state) => state.user?.otherUsers ?? []);
  const onlineUsers = useSelector((state) => state.user?.onlineUsers ?? []);
  const normalizedSearch = search.trim().toLowerCase(); // Normalize the search term by trimming whitespace and converting it to lowercase for case-insensitive filtering of users
  const filteredUsers = otherUsers.filter((user) => {
    // Filter the list of other users based on the normalized search term, checking if the user's full name includes the search term
    if (!normalizedSearch) return true;

    return String(user.fullName ?? "") // Convert the user's full name to a string and check if it includes the normalized search term, allowing for case-insensitive matching
      .toLowerCase()
      .includes(normalizedSearch);
  });

  if (!otherUsers) return; // Early return in react

  return (
    // Render the list of filtered other users, displaying each user as an OtherUser component with their relevant information and online status
    <div className="max-h-[calc(100dvh-255px)] space-y-2 overflow-y-auto pr-1 sm:max-h-[calc(100dvh-280px)]">
      {filteredUsers.map((user) => (
        <OtherUser
          key={user._id}
          conversation={{
            id: user._id,
            name: user.fullName,
            lastMessage: "Say hello 👋",
            time: "Now",
            unread: 0,
            online: onlineUsers.some(
              (onlineUserId) => String(onlineUserId) === String(user._id),
            ),
            avatar: user.profilePhoto,
          }}
        />
      ))}
    </div>
  );
};

export default OtherUsers;
