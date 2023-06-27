import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'


// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // console.log(user)
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      // let token = req.cookies.jwt;
      // console.log(token)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        username: user.username,
        phone: user.phone,
        projects: user.projects,
        discussions: user.discussions,
        following: user.following,
        followers: user.followers,
        notifications: user.notifications,
        privacy: user.privacy,
        socialMedia: user.socialMedia,
        publicPhone: user.publicPhone,
        publicEmail: user.publicEmail,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, username } = req.body;
    const publicPhone = phone;
    const publicEmail = email;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      username,
      phone,
      publicPhone,
      publicEmail,
    });
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          username: user.username,
          phone: user.phone,
          projects: user.projects,
          discussions: user.discussions,
          following: user.following,
          followers: user.followers,
          notifications: user.notifications,
          privacy: user.privacy,
          socialMedia: user.socialMedia,
          publicPhone: user.publicPhone,
          publicEmail: user.publicEmail,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        // httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { username, _id, name } = req.user;
    const { userId } = req.query;
    const sameUser = _id == userId;
    const user = await User.findById(userId);
    if (sameUser) {
        const userResult = {
          _id: user._id,
          name: user.name,
            email: user.email,
          pic: user.pic,
          username: user.username,
            phone: user.phone,
          projects: user.projects,
          discussions: user.discussions,
          following: user.following,
          followers: user.followers,
            notifications: user.notifications,
            privacy: user.privacy,
          socialMedia: user.socialMedia,
          publicPhone: user.publicPhone,
          publicEmail: user.publicEmail,
          sameUser,
        };
        res.status(200).json(userResult);   
    } else {
        const userResult = {
          _id: user._id,
          name: user.name,
          pic: user.pic,
          username: user.username,
        //   projects: user.projects,
          // discussions: user.discussions,
          following: user.following,
          followers: user.followers,
          socialMedia: user.socialMedia,
          publicPhone: user.publicPhone,
          publicEmail: user.publicEmail,
          sameUser,
        };
        res.status(200).json(userResult);
    }
});

// @desc    Get user people
// route    GET /api/users/people
// @access  Private
const getUserPeople = asyncHandler(async (req, res) => {
  const { user_id } = req.query;

  try {
    // Find the user by user_id
    const user = await User.findById(user_id)
      .populate("followers following");
      // .select("name followers following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array to store the user's followers and following
    const userPeople = [];

    // Add followers to the userPeople array
    user.followers.forEach((follower) => {
      userPeople.push({
        userID: follower._id.toString(),
        name: follower.name,
        role: ["follower"],
      });
    });

    // Add following to the userPeople array
    user.following.forEach((following) => {
      // Check if the following user is already in the userPeople array as a follower
      const existingUser = userPeople.find(
        (user) => user.userID === following._id.toString()
      );

      if (existingUser) {
        // If the following user is already in the array, add the "following" role to their role array
        existingUser.role.push("following");
      } else {
        // If the following user is not in the array, add them as a new entry with the "following" role
        userPeople.push({
          userID: following._id.toString(),
          name: following.name,
          role: ["following"],
        });
      }
    });

    return res.json(userPeople);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        user.pic = req.body.pic || user.pic;
        user.phone = req.body.phone || user.phone;
        user.projects = req.body.projects || user.projects;
        user.discussions = req.body.discussions || user.discussions;
        user.following = req.body.following || user.following;
        user.followers = req.body.followers || user.followers;
        user.notifications = req.body.notifications || user.notifications;
        user.privacy = req.body.privacy || user.privacy;
        const s = req.body.socialMedia;
        if (s?.twitter || s?.facebook || s?.linkedin || s?.github) {
            user.socialMedia = req.body.socialMedia;
        } else {
            user.socialMedia = user.socialMedia;
        }
        user.publicPhone = req.body.publicPhone || user.publicPhone;
        user.publicEmail = req.body.publicEmail || user.publicEmail;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          pic: updatedUser.pic,
          username: updatedUser.username,
          phone: updatedUser.phone,
          projects: updatedUser.projects,
          discussions: updatedUser.discussions,
          following: updatedUser.following,
          followers: updatedUser.followers,
          notifications: updatedUser.notifications,
          privacy: updatedUser.privacy,
          socialMedia: updatedUser.socialMedia,
          publicPhone: updatedUser.publicPhone,
          publicEmail: updatedUser.publicEmail,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userId = req.body?.userId;
  if (!userId) {
    res.status(400);
    throw new Error("Specify a user to follow");
  }
  if (user.following.includes(userId)) {
    user.following = user.following.filter((id) => !id.equals(userId));
  } else {
    user.following.push(userId);
    const followedUser = await User.findById(userId);
    if (followedUser) {
      followedUser.followers.push(user._id);
      await followedUser.save();
    }
  }
  const updatedUser = await user.save();
  res.status(200).json({ updatedUser });
});

const getUserFollowingFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // return {following: [array of ids], followers: [array of ids]}
  const following = user.following;
  const followers = user.followers;
  // const followers = await User.find({ _id: { $in: user.followers } }, "_id");

  res.status(200).json({ following, followers });
});

const unfollowUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userId = req.body?.userId;
  if (!userId) {
    res.status(400);
    throw new Error("Specify a user to unfollow");
  }
  if (user.following.includes(userId)) {
    user.following = user.following.filter((id) => !id.equals(userId));
    const followedUser = await User.findById(userId);
    if (followedUser) {
      followedUser.followers = followedUser.followers.filter(
        (id) => !id.equals(user._id)
      );
      await followedUser.save();
    }
    const updatedUser = await user.save();
    res.status(200).json({ updatedUser });
  } else {
    res.status(400);
    throw new Error("You are not following this user");
  }
});



export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserPeople,
  updateUserProfile,
  followUser,
  unfollowUser,
  getUserFollowingFollowers,
};