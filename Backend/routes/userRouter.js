import { Router } from "express";
import { login,logout,signup,auth } from "../controllers/loginSignup.js";
import { getAllMemories, createMemory, getMemory, updateMemory, deleteMemory } from "../controllers/memoryController.js";
import { getProfile, updateProfile, addFriend, getFriends } from "../controllers/userController.js";
import authorization from "../middleware/auth.js";
import multer from "multer";
import path from "path";

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
    }
  })
  
const upload = multer({ storage: storage });

const userRouter = Router()

// Auth Routes
userRouter.post("/login",login)
userRouter.post("/signup",signup)
userRouter.get("/logout",logout)
userRouter.get("/auth",authorization,auth)

// Memory Routes
userRouter.route("/memories")
    .get(authorization, getAllMemories)
    .post(authorization, upload.array('images', 5), createMemory);

userRouter.route("/memories/:id")
    .get(authorization, getMemory)
    .patch(authorization, upload.array('images', 5), updateMemory)
    .delete(authorization, deleteMemory);

// User/Profile Routes
userRouter.route("/profile").get(authorization, getProfile).patch(authorization, updateProfile);
userRouter.route("/friends").get(authorization, getFriends).post(authorization, addFriend);

export default userRouter