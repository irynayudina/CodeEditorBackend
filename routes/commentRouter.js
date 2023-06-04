import express from "express";
import {
  createComment,
  getAllComments,
  getCommentId,
  getAllCommentsOfDiscussion,
  updateCommentsWithAuthor,
  getAllCommentsOfUser,
} from "../controllers/commentController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createComment).get(getAllComments);

router.get("/id", getCommentId);
router.get("/ofDiscussion", getAllCommentsOfDiscussion);
router.get("/ofUser", getAllCommentsOfUser);
router.post("/updateAuthor", updateCommentsWithAuthor);
export default router;
