import mongoose from "mongoose";

const discussionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      requireed: true,
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requireed: true,
      },
      name: {
        type: String,
      },
      username: {
        type: String,
      },
    },
    text: {
      type: String,
      requireed: true,
    },
    topic: {
      type: String,
      requireed: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentsLength: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;
