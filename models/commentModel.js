import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      username: {
        type: String,
      },
    },
    likes: {
      type: Number,
    },
    text: {
      type: String,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isAnswer: {
      type: Boolean,
      default: false,
    },
    parentDiscussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;