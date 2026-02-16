import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Notification from "./pages/Notification.jsx";
import Messages from "./pages/Messages.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditProfile from "./pages/EditProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/editProfile" element={<EditProfile />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
