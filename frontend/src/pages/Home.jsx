import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { IoMoonSharp } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

const Home = () => {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  // ================= THEME SETUP =================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      setDark(true);
    } else {
      localStorage.setItem("theme", "light");
      setDark(false);
    }
  };

  // ================= FETCH USER =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "import.meta.env.VITE_API-URL/api/v1/profile",
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const toggleLike = (postId) => {
    setUser((prev) => ({
      ...prev,
      posts: prev.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked
                ? post.likes.slice(0, -1)
                : [...post.likes, "you"],
            }
          : post
      ),
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black">
        <p className="text-lg font-semibold animate-pulse text-black dark:text-white">
          Loading feed...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-colors duration-300">

      {/* ================= NAVBAR ================= */}
      <div className="bg-white dark:bg-black border-b dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-2xl font-bold tracking-wide">
            Instagram
          </h1>

          <input
            type="text"
            placeholder="Search"
            className="hidden md:block bg-gray-100 dark:bg-gray-800 dark:text-white px-3 py-1 rounded-md text-sm focus:outline-none"
          />

          <div className="flex items-center gap-5 text-xl">
            <span className="cursor-pointer"><GoHomeFill /></span>
            <span className="cursor-pointer" onClick={() => navigate("/messages")}><LuSend /></span>
            <span className="cursor-pointer" onClick={() => navigate("/createPost")}><IoAdd  className="text-3xl"/></span>
            <span className="cursor-pointer" onClick={() => navigate("/notification")}><FaRegHeart /></span>

            {/* 🌙 DARK MODE BUTTON */}
            <button
              onClick={toggleTheme}
              className="text-xl hover:scale-110 transition"
            >
              {dark ? <IoMoonSharp /> : <IoMoonOutline />}
            </button>

            <img
              src={user.profilePic}
              onClick={() => navigate("/profile")}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-xl mx-auto px-4 py-6">

        {/* STORIES */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-md p-4 mb-6 flex gap-4 overflow-x-auto">
          {[user, ...(user.followers || [])].slice(0, 8).map((story, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                <img
                  src={story.profilePic || user.profilePic}
                  alt=""
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black"
                />
              </div>
              <span className="text-xs mt-1">
                {story.username || user.username}
              </span>
            </div>
          ))}
        </div>

        {/* FEED */}
        {user.posts?.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-md mb-8"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.profilePic}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">
                  {user.username}
                </span>
              </div>
              <span className="cursor-pointer">⋯</span>
            </div>

            <img
              src={post.image}
              alt="post"
              className="w-full max-h-[600px] object-cover"
            />

            <div className="px-4 pt-3">
              <div className="flex justify-between text-xl">
                <div className="flex gap-4">
                  <span
                    onClick={() => toggleLike(post._id)}
                    className={`cursor-pointer ${
                      post.isLiked ? "text-red-500" : ""
                    }`}
                  >
                    {post.isLiked ? "❤️" : "🤍"}
                  </span>
                  <span className="cursor-pointer">💬</span>
                  <span className="cursor-pointer">📤</span>
                </div>
                <span className="cursor-pointer">🔖</span>
              </div>

              <p className="font-semibold text-sm mt-2">
                {post.likes?.length || 0} likes
              </p>

              <p className="text-sm mt-1">
                <span className="font-semibold mr-1">
                  {user.username}
                </span>
                {post.caption}
              </p>

              <div className="border-t dark:border-gray-800 mt-3 pt-3 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 text-sm bg-transparent focus:outline-none"
                />
                <button className="text-blue-500 font-semibold text-sm">
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;
