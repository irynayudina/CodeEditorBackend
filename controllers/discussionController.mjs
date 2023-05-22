import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Discussion from "../models/discussionModel.js";

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
          answers: discussion.answers,
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
    const { discussionId} = req.body;
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
          answers: discussion.answers,
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
  const topic = req.query?.topic;
  const titlePart = req.query?.title?.split(",");
  const tags = req.query?.tags?.split(","); // Array of tags
  const limit = 4; // Number of discussions per page
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

  const totalDiscussions = await Discussion.countDocuments(filter);
  const totalPages = Math.ceil(totalDiscussions / limit);

  const discussions = await Discussion.find(filter)
    .select("_id title author topic text tags createdAt likes answers")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  
  res.status(200).json({
    discussions,
    totalPages,
    currentPage: page,
  });
})

export { createDiscussion, getDiscussionByID, getDiscussios };