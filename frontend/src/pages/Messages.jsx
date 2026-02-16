import axios from "axios";
import React, { useEffect, useState } from "react";

const Messages = () => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "import.meta.env.VITE_API_URL/api/v1/profile",
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-lg font-semibold animate-pulse">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-full md:w-1/3 bg-white border-r">

        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">{user.username}</h2>
          <span className="text-xl cursor-pointer">✏️</span>
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto h-[calc(100vh-70px)]">
          {user.conversations?.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p._id !== user._id
            );

            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
                  selectedChat?._id === chat._id ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={otherUser?.profilePic}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {otherUser?.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.lastMessage?.text}
                  </p>
                </div>

                {chat.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RIGHT CHAT WINDOW ================= */}
      <div className="hidden md:flex flex-1 flex-col">

        {!selectedChat ? (
          <div className="flex flex-1 justify-center items-center text-gray-400">
            Select a chat to start messaging
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3 bg-white">
              <img
                src={
                  selectedChat.participants.find(
                    (p) => p._id !== user._id
                  )?.profilePic
                }
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">
                {
                  selectedChat.participants.find(
                    (p) => p._id !== user._id
                  )?.username
                }
              </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="text-center text-gray-400 text-sm mt-10">
                Chat messages will appear here
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white flex items-center gap-3">
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
              />
              <button className="text-blue-500 font-semibold">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
