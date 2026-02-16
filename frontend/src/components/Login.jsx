import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", data,
  {
    withCredentials: true, 
  });
      console.log(res.data);
      navigate("/home")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[350px] bg-white border border-gray-300 p-8">
        <h1 className="text-5xl text-center mb-6 font-serif">Instagram</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none"
            onChange={handleChange}
            value={data.email}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none"
            onChange={handleChange}
            value={data.password}
            required
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600">
            Log In
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-xs text-gray-400 font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <p className="text-center text-sm">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 font-semibold cursor-pointer ml-1"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
