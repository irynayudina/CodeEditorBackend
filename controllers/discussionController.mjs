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
        });
    } else {
        res.status(400);
        throw new Error("Invalid discussion data");
    }
});

export { createDiscussion };