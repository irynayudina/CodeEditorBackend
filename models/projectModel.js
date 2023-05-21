import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  language: {
    type: String,
  },
  codeFile: {
    type: String,
  },
  likes: {
    type: Number,
  },
  isPublic: {
    type: Boolean,
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});