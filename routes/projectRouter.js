import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controllers/projectsController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createProject).get(getProjects);
router.post("/id", protect, updateProjectById).get("/id", getProjectById);
router.post("/delete", protect, deleteProjectById);

// router.get("/ofDiscussion", getAllCommentsOfDiscussion);
// router.post("/updateAuthor", updateCommentsWithAuthor);
export default router;