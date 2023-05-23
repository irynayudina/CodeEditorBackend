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
    //id author likes text answers isAnswer
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

  console.log("discussion id: " + discussionId);
  if (!discussionId) {
    res.status(400);
    throw new Error("Please specify the discussion");
  }

  const totalDiscussions = await Comment.countDocuments(filter);
  const totalPages = Math.ceil(totalDiscussions / limit);

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

export {
  createComment,
  getAllComments,
  getCommentId,
  getAllCommentsOfDiscussion,
};