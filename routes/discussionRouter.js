import express from "express";
import {
  createDiscussion,
  getDiscussionByID,
  getDiscussios,
  replyDiscussion,
} from "../controllers/discussionController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createDiscussion)
  .get(getDiscussionByID);

router.get("/all", getDiscussios);
router.route("/comments").post(replyDiscussion);
export default router;