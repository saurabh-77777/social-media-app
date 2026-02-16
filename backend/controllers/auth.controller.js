import { User } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinaryConfig.js"


export const read = (req,res) => {
  console.log(req.cookies)
  res.send("read this page")
}
export const register = async (req,res) => {
  const {name, email, password} = req.body;

  try{
    const isMatch = await User.findOne({email});
  if(isMatch){
    return res.json({massage: "Invalid user credential"})
  }
  const hashPassword = await bcrypt.hash(password,10)
  const user = await User.create({
    name,
    email,
    password:hashPassword,
  })
  console.log(token)
  res.status(200).json(
    {massage:"successfully registered",
    user:user,
  })
  } catch(error){
    console.log(error)
  }
}
export const login = async (req,res) => {
  const {email, password} = req.body;

  try{
    const user = await User.findOne({email});
  if(!user){
    return res.json({massage: "Invalid user credential"})
  }
  const isMatched = await bcrypt.compare(password,user.password)

  if(!isMatched){
    return res.json({massage: "Invalid user credential"})
  }
  const token = jwt.sign(
    {id:user._id, email:user.email},
    process.env.SECRET_KEY,
    {expiresIn:"1d"}
  )
  res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // localhost ke liye
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
  res.status(200).json(
    {message:"successfully login",
    user:user,
    cookie:req.cookies.token
  })
  } catch(error){
    console.log(error)
  }
}
export const profile = async (req,res) => {

  try{
    const user = await User.findById(req.user.id).select("-password");
  
  res.json(user)
  } catch(error){
    console.log(error)
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    user.name = name || user.name;
    user.username = username || user.username;
    user.bio = bio || user.bio;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "profilePic",
          width: 500,
          height: 500,
          crop: "fill",
        }
      );

      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }

      user.profilePic = result.secure_url;
      user.cloudinaryId = result.public_id;
    }
    await user.save();


    res.status(200).json({
      message: "Profile updated successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


