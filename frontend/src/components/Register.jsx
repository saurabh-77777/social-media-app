import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "import.meta.env.VITE_API-URL/api/v1/register",
        data,
      );

      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[350px] bg-white border border-gray-300 p-8">
        <h1 className="text-5xl text-center mb-3 font-serif">Instagram</h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-semibold cursor-pointer ml-1"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
