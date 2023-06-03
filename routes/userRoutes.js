import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserPeople,
  updateUserProfile,
  followUser,
  unfollowUser,
  getUserFollowingFollowers,
} from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/people").get(protect, getUserPeople);
router.route("/followingFollowers").get(protect, getUserFollowingFollowers);
router.route("/follow").post(protect, followUser);
router.route("/unfollow").post(protect, unfollowUser);

  
export default router