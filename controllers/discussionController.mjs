import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Discussion from "../models/discussionModel.js";
import Comment from "../models/commentModel.js";

// @desc    Create discussion, assign it to user
// route    POST /api/discussions
// @access  Public
const createDiscussion = asyncHandler(async (req, res) => {
    const { title, topic, text, tags} = req.body;
    const { username, _id, name } = req.user;
    let author = { username, _id, name };
    if (!title || !author || !topic || !text) {
        res.status(400);
        throw new Error("Please provide all the required fields");
    }
    const discussion = await Discussion.create({
        title,
        author,
        topic,
        text,
        tags,
    });
    if (discussion) {
        res.status(201).json({
          _id: discussion._id,
          title: discussion.title,
          author: discussion.author,
          topic: discussion.topic,
          text: discussion.text,
          tags: discussion.tags,
          createdAt: discussion.createdAt,
          likes: discussion.likes,
          comments: discussion.comments,
        });
    } else {
        res.status(400);
        throw new Error("Invalid discussion data");
    }
});

// @desc    Get discussion by id and send the data
// route    GET /api/discussions
// @access  Public
const getDiscussionByID = asyncHandler(async (req, res) => {
    const { discussionId } = req.query || req.body;
    const discussion = await Discussion.findById(discussionId);
    if (discussion) {
        res.status(200).json({
        _id: discussion._id,
          title: discussion.title,
          author: discussion.author,
          topic: discussion.topic,
          text: discussion.text,
          tags: discussion.tags,
        createdAt: discussion.createdAt,
        likes: discussion.likes,
          comments: discussion.comments,
        });
    } else {
        res.status(404);
        throw new Error("Discussion is not found");
    }
});

// @desc    Get all discussions
// route    GET /api/discussions/all
// @access  Public
const getDiscussios = asyncHandler(async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const topic = req.query?.topic === "all" ? null : req.query?.topic;
  const titlePart = req.query?.title?.split(",");
  const tags = req.query?.tags?.split(","); // Array of tags
  const authorId = req.query?.authorId; // Optional author ID
  const limit = 4; // Number of discussions per page
  const sortObj = req.query?.sortBy === 'popular' ? { commentsLength: -1 } : { createdAt: -1 };
  console.log("getting filtered discussions")
  console.log(req.query)
  let filter = {};

  if (topic && topic !== "0") {
    filter.topic = { $regex: new RegExp(topic, "i") };
  }

  if (titlePart && Array.isArray(titlePart) && titlePart.length > 0) {
    filter.$or = titlePart.map((title) => ({
      title: { $regex: title, $options: "i" },
    }));
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    // filter.tags = { $in: tags };
    filter.$or = filter.$or || [];
    filter.$or.push({ tags: { $in: tags } });
  }

  if (authorId) {
    filter["author._id"] = authorId;
  }

  const totalDiscussions = await Discussion.countDocuments(filter);
  const totalPages = Math.ceil(totalDiscussions / limit);

  const discussions = await Discussion.find(filter)
    .select("_id title author topic text tags createdAt likes comments commentsLength")
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  
  res.status(200).json({
    discussions,
    totalPages,
    currentPage: page,
  });
})

// @desc    Reply to a discussion with a comment - update a discussion by id pushing the id of comment to the array of dicsussion comments
// route    POST /api/discussions/comment
// @access  Public
const replyDiscussion = asyncHandler(async (req, res) => {
  const { discussionId, commentId } = req.body;
  // Update the discussion by pushing the commentId to the comments array
  const updatedDiscussion = await Discussion.findByIdAndUpdate(
    discussionId,
    {
      $push: { comments: { $each: [commentId], $position: 0 } },
      $inc: { commentsLength: 1 }, // Increment commentsLength by 1
    },
    { new: true }
  );

  res.status(200).json({ success: true, data: updatedDiscussion });
})

// @desc    Update earlier created discussions with a field for comparison while sorting
// route    POST /api/discussions/fixup/commentsLength
// @access  Public
const updateDiscussions = asyncHandler(async (req, res) => {
  try {
    await Discussion.updateMany(
      { commentsLength: { $exists: false } },
      { $set: { commentsLength: 0 } }
    );
    res.status(200).json({ msg: "updated all" });
  } catch (error) {
    res.status(500);
    throw new Error("Error updating discussions:");
  }
})

// @desc    Update old comments with parent discussion
// route    POST /api/discussions/fixup/commentsParentDiscussion
// @access  Public
const updateCommentsWithParentDiscussion = asyncHandler(async (req, res) => {
  const discussions = await Discussion.find();

  for (const discussion of discussions) {
    if (discussion.comments.length > 0) {
      await Comment.updateMany(
        {
          _id: { $in: discussion.comments },
          parentDiscussion: { $exists: false },
        },
        { $set: { parentDiscussion: discussion._id } }
      );
    }
  }
  res.status(200).json({ msg: "updated all" });
})

export {
  createDiscussion,
  getDiscussionByID,
  getDiscussios,
  replyDiscussion,
  updateDiscussions,
  updateCommentsWithParentDiscussion,
};