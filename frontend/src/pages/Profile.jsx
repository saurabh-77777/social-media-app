import axios from "axios";
import React from "react";

import { useEffect , useState } from "react"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const fetchProfile = async () => { 
<<<<<<< HEAD
    const res = await axios.get(`${API}/api/v1/profile`,
=======
    const res = await axios.get("import.meta.env.VITE_API_URL/api/v1/profile",
>>>>>>> d6dce7d0cfe056023ccc73c6117c325b825c7966
    {
    withCredentials:true,
  });
  setUser(res.data);
}
  
  fetchProfile();
},[])
  const info = {
    posts: 6,
    followers: 540,
    following: 320,
  };

  const posts = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={user?.profilePic}
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full">

            {/* Username & Button */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {user?.name}
              </h2>

              <button className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition" onClick={() => navigate("/editProfile")}>
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 text-sm md:text-base">
              <span>
                <strong className="font-semibold">{info?.posts}</strong> posts
              </span>
              <span>
                <strong className="font-semibold">{info?.followers}</strong> followers
              </span>
              <span>
                <strong className="font-semibold">{info?.following}</strong> following
              </span>
            </div>

            {/* Bio */}
            <div className="mt-4 space-y-1">
              <p className="font-semibold">{user?.username}</p>
              <p className="text-gray-600 text-sm md:text-base">
                {user?.bio}
              </p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="relative group aspect-square overflow-hidden"
            >
              <img
                src={`${post}?auto=format&fit=crop&w=500&q=80`}
                alt="post"
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold">
                ❤️ 120
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
