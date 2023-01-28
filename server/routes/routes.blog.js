import express from "express";

import { postBlog, getBlog, getBlogById, postComment } from "../controllers/controller.blog.js";

const blogRouter = express.Router();


blogRouter.get("/", getBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/:id", postComment);
blogRouter.post("/", postBlog);



export default blogRouter;
