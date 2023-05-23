import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from './routes/userRoutes.js'
import discussionRouter from './routes/discussionRouter.js'
import commentRouter from "./routes/commentRouter.js";
// import commen

import cookieParser from "cookie-parser";
import editor from './routes/editor/editor.mjs'
dotenv.config();
const app = express();
const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
const port = process.env.PORT || "8080";

app.use("/editor", editor);
app.use("/api/users", userRoutes);
app.use("/api/discussions", discussionRouter);
app.use("/api/comments", commentRouter);
app.get('/', (req, res) => { res.send('Server is ready') });

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log("Server started on port 8080"));


// POST /api/users*** - register a user
// POST /api/users/auth*** - log in a user and get token
// POST /api/users/logout*** - logout user and clear cookie
// GET /api/users/profile*** - get user profile
// PUT /api/users/profile*** - update profile