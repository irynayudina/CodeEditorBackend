import mongoose from "mongoose";

const collabSchema = mongoose.Schema({
  collab_id: {
    type: String,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  associatedProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Collab = mongoose.model("Collab", collabSchema);

export default Collab;