import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'


// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user)
    if (user && (await user.matchPassword(password))) {
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
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
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
    };
    res.status(200).json(user)
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

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}