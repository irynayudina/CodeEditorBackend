import express from "express";
import { createDiscussion } from "../controllers/discussionController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createDiscussion);

export default router;