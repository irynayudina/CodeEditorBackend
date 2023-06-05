import mongoose from "mongoose";

const collabSchema = mongoose.Schema({
  collab_id: {
    type: String,
    unique: true,
  },
  owner: {
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
  associatedProject: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    name: {
      type: String,
    },
  },
});

const Collab = mongoose.model("Collab", collabSchema);

export default Collab;