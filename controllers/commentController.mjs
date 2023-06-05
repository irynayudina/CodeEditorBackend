import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

// @desc    Create comment, assign it to user
// route    POST /api/comments
// @access  Public
const createComment = asyncHandler(async (req, res) => { 
    const { username, _id, name } = req.user;
    const { text, isAnswer, parentDiscussion } = req.body;
    const author = {_id, name, username}
    if(!text){
      res.status(400);
      throw new Error("Please add a comment");
    }
    const comment = await Comment.create({
      author,
      text,
      isAnswer,
      parentDiscussion,
    });
  res.status(200).json({
    _id: comment._id,
    author: comment.author,
    text: comment.text,
    isAnswer: comment.isAnswer,
    createdAt: comment.createdAt,
    answers: comment.answers,
    likes: comment.likes,
    parentDiscussion: comment.parentDiscussion,
  });
})

// @desc    Get all coments
// route    GET /api/comments
// @access  Public
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({})
    .select("_id author text isAnswer createdAt answers likes parentDiscussion")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({
    comments,
    amount: comments.length,
  });
})
 
// @desc    Get comment by id
// route    GET /api/comments/id
// @access  Public
const getCommentId = asyncHandler(async (req, res) => {
  const commentId = req.query?.commentId;
  if (!commentId) {
    res.status(400);
    throw new Error("Please add a comment");
  }
  const comment = await Comment.findById(commentId)
    .select("_id author text isAnswer createdAt answers likes parentDiscussion")
    .exec();

  res.status(200).json({
    comment
  });
})
 
// @desc    Get all coments of a discussion
// route    GET /api/comments/ofDiscussion
// @access  Public
const getAllCommentsOfDiscussion = asyncHandler(async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const { discussionId } = req.query || req.body;
  const limit = 4; // Number of discussions per page
  let filter = { parentDiscussion: { $in: discussionId } };

  if (!discussionId) {
    res.status(400);
    throw new Error("Please specify the discussion");
  }

  const totalComments = await Comment.countDocuments(filter);
  const totalPages = Math.ceil(totalComments / limit);

  const comments = await Comment.find(filter)
    .select("_id author text isAnswer createdAt answers likes parentDiscussion")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  res.status(200).json({
    comments,
    totalPages,
    currentPage: page,
  });
})

// @desc    Get all coments of a user
// route    GET /api/comments/ofDiscussion
// @access  Public
const getAllCommentsOfUser = asyncHandler(async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const authorId = req.query?.authorId; // Optional author ID
  const limit = 4; // Number of discussions per page
  let filter = {};
  if (authorId) {
    filter["author._id"] = authorId;
  }

  if (!authorId) {
    res.status(400);
    throw new Error("Please specify the user");
  }

  const totalComments = await Comment.countDocuments(filter);
  const totalPages = Math.ceil(totalComments / limit);

  const comments = await Comment.find(filter)
    .select("_id author text isAnswer createdAt answers likes parentDiscussion")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({
      path: "parentDiscussion",
      select: "title", // Select the 'title' field of the parentDiscussion
    })
    .exec();
  

  res.status(200).json({
    comments,
    totalPages,
    currentPage: page,
  });
})

// @desc    Update old comments with author _id field
// route    POST /api/comments/updateAuthor
// @access  Public
const updateCommentsWithAuthor = asyncHandler(async (req, res) => {
  // const comments = await Comment.find();

  // for (const comment of comments) {
  //   if (comment.author.id == null) {
  //     await Comment.updateMany(
  //       {
  //         author.name: "John James",
  //       },
  //       { $set: { author._id =  "6464e5036b479e8e12489f87"} }
  //     );
  //   }
  // }
  const comments = await Comment.find({ "author.name": "John James" });
  const oldComments = await Comment.countDocuments({ });
  const totalComments = await Comment.countDocuments({ "author.name": "John James" });
  for (const comment of comments) {
    if (!comment.author._id) {
      comment.author._id = "6464e5036b479e8e12489f87";
      await comment.save();
    }
  }

  res.status(200).json({ msg: "updated all", comments });
})

export {
  createComment,
  getAllComments,
  getCommentId,
  getAllCommentsOfDiscussion,
  updateCommentsWithAuthor,
  getAllCommentsOfUser,
};