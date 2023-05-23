import express from "express";
import {
  createDiscussion,
  getDiscussionByID,
  getDiscussios,
  replyDiscussion,
  updateDiscussions,
} from "../controllers/discussionController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createDiscussion)
  .get(getDiscussionByID);

router.get("/all", getDiscussios);
router.route("/comments").post(replyDiscussion);
router.post("/fixup/commentsLength", updateDiscussions);
export default router;