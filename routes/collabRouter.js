import express from "express";
import {
  createCollab,
  getCollab,
  getCollabById,
} from "../controllers/collabController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createCollab).get(protect, getCollab);
router.route("/id").get(protect, getCollabById);

export default router;
