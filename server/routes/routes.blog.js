import express from "express";

import { postBlog, getBlog } from "../controllers/controller.blog.js";

const blogRouter = express.Router();


blogRouter.get("/", getBlog);

blogRouter.post("/", postBlog);



export default blogRouter;
