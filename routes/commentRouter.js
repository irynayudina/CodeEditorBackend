import express from "express";
import {
  createComment,
  getAllComments,
  getCommentId,
  getAllCommentsOfDiscussion,
} from "../controllers/commentController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createComment).get(getAllComments);

router.get("/id", getCommentId);
router.get("/ofDiscussion", getAllCommentsOfDiscussion);
export default router;
