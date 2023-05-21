import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.js";

// import multer from "multer";
// const upload = multer({ dest: 'uploads/' }); // Set the destination folder for file uploads

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  //  upload.single("image");

export default router