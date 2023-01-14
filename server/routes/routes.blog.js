import express from "express";

import { postBlog, getBlog, getBlogById } from "../controllers/controller.blog.js";

const blogRouter = express.Router();


blogRouter.get("/", getBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/", postBlog);



export default blogRouter;
