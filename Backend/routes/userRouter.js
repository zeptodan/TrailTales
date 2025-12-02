import { Router } from "express";
import { login,logout,signup,auth } from "../controllers/loginSignup.js";
import authorization from "../middleware/auth.js";

const userRouter = Router()

userRouter.post("/login",login)
userRouter.post("/signup",signup)
userRouter.get("/logout",logout)
userRouter.get("/auth",authorization,auth)

export default userRouter