import axios from "axios";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [user, setUser] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
<<<<<<< HEAD
          `${API}/api/v1/profile`,
=======
          "import.meta.env.VITE_API_URL/api/v1/profile",
>>>>>>> d6dce7d0cfe056023ccc73c6117c325b825c7966
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-lg font-semibold animate-pulse">
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-xl font-semibold">Notifications</h1>

          <img
            src={user.profilePic}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Notification List */}
      <div className="max-w-xl mx-auto py-6 px-4">

        {user.notifications?.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No notifications yet
          </div>
        )}

        {user.notifications?.map((notification) => (
          <div
            key={notification._id}
            className="bg-white border rounded-md p-4 mb-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">

              {/* Sender Profile Pic */}
              <img
                src={notification.user?.profilePic}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Message */}
              <div className="text-sm">
                <p>
                  <span className="font-semibold">
                    {notification.user?.username}
                  </span>{" "}
                  {notification.message}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Right Side Action */}
            {notification.type === "follow" && (
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md font-semibold">
                Follow Back
              </button>
            )}

            {notification.type === "like" && (
              <span className="text-red-500 text-lg">❤️</span>
            )}

            {notification.type === "comment" && (
              <span className="text-gray-600 text-lg">💬</span>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Notification;
