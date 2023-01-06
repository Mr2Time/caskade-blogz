import express from "express";
import helmet from "helmet";
import Joi from "joi";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectToDB from "./config/config.js";

import userRouter from "./routes/routes.user.js";
import { userAuth } from "./routes/routes.auth.js";
import blogRouter from './routes/routes.blog.js';

const app = express();

/* Setting up the server. */

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(morgan("dev"));
dotenv.config({ path: ".env" });

app.get("/", (req, res) => {
  res.send("Hello, this is the backend.");
});

// routes here
app.use("/api/users", userRouter);
app.use("/api/users/auth", userAuth);
app.use("/api/blog/posts", blogRouter);

// connecting to db
connectToDB();
mongoose.set("strictQuery", false);

// listening to server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
