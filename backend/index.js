import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import router from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const port = process.env.PORT;
const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 EXACT frontend URL
    credentials: true,               // 👈 REQUIRED
  })
);
app.use(cookieParser())

// database
connectDB()

// api
app.use("/api/v1",router);

app.listen(port,() => {
  console.log(`server start on PORT http://localhost:${port}`)
})