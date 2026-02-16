import mongoose from "mongoose";

export const connectDB = async () => {
  try{
    const isConnect = await mongoose.connect(process.env.MONGODB_URI)
      if(!isConnect){
        return console.log("database is not connected")
      }
    console.log("connected to Database !")
  } catch(error) {
    console.log(error);
  }

}