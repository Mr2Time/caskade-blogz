import { userSignup, getUserBlogs } from "../controllers/controller.user.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post("/register", userSignup);
userRouter.get("/myblogs", getUserBlogs);



export default userRouter;