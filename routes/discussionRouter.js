import express from "express";
import {
  createDiscussion,
  getDiscussionByID,
  getDiscussios,
} from "../controllers/discussionController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createDiscussion)
  .get(getDiscussionByID);

router.get("/all", getDiscussios);
export default router;