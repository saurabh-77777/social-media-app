import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    trim:true,
    minlength:[2,"Name is at least 2 characters"]
  },
  username:{
    type:String,
    trim:true,
    minlength:[2,"Name is at least 2 characters"]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    minlength:[12,"Password is at least 12 characters"],
    lowercase:true
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[8,"Mobile number is at least 8 characters"],
  },
  profilePic: {
    type: String,
    default: ""
  },
  cloudinaryId:{
    type: String,
  },
  dateOfBirth:{
    type:String,
    // required:[true,"Date of Birth is required"],
  },
  mobile:{
    type:String,
    // required:[true,"Mobile number is required"],
    minlength:[10,"Mobile number is at least 10 characters"],
  },
  bio:{
    type:String,
    maxlength:[300,"Maximum 300 characters"],
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  followers:[],
  followings:[],
  posts:[],
},
{timestamps:true}
)

export const User = mongoose.model("user",authSchema);