import express from "express";
import {
  createDiscussion,
  getDiscussionByID,
  getDiscussios,
  replyDiscussion,
  updateDiscussions,
  updateCommentsWithParentDiscussion,
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
router.get("/fixup/commentsParentDiscussion", updateCommentsWithParentDiscussion);
export default router;