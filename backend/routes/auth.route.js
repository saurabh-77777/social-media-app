import express from "express";
import { register, login, read, profile, updateProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.get("/read",read);
router.post("/register",register);
router.post("/login",login);
router.get("/profile", authMiddleware, profile);
router.put("/update-profile", authMiddleware, upload.single("profilePic"),updateProfile);

export default router;