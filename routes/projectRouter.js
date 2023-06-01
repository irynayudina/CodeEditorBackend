import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/projectsController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createProject).get(getProjects);
router.get("/id", getProjectById);

// router.get("/ofDiscussion", getAllCommentsOfDiscussion);
// router.post("/updateAuthor", updateCommentsWithAuthor);
export default router;