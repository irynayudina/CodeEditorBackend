import asyncHandler from "express-async-handler";
import Collab from "../models/collabModel.js";
import Project from "../models/projectModel.js";
import mongoose from "mongoose";

// @desc    Create collab, assign it to user
// route    POST /api/collab
// @access  Public
const createCollab = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const autor = { _id };
  const { collab_id, associatedProject_id } = req.body;
  const associatedProject = associatedProject_id;
  if (!collab_id || !associatedProject_id) {
    res.status(400);
    throw new Error("Cannot create without required data");
  }

  try {
    const collabCheck = await Collab.findOne({
      collab_id: collab_id,
      associatedProject: associatedProject,
    });
    if (collabCheck) {
      res.status(400);
      throw new Error("Collab ID must be unique");
    }

    const collab = await Collab.create({
      collab_id,
      owners: [autor],
      associatedProject,
    });
    console.log(collab);

    const populatedCollab = await Collab.findById(collab._id)
      .populate({
        path: "owners",
        select: "_id username name",
      })
      .populate("associatedProject", "_id projectName")
      .exec();

    res.status(200).json(populatedCollab);
  } catch (error) {
    console.log(error.message);
    // res.status(500);
    // throw new Error("Error creating collab");
  }
});

// @desc    Get collabs
// route    GET /api/collab
// @access  Public
const getCollab = asyncHandler(async (req, res) => {
  const { owner_id } = req.query;
  const page = parseInt(req.query?.page) || 1;
  const limit = 4; // Number of projects per page

  const ownersReq = [owner_id];
  let filter = {};
  if (owner_id && Array.isArray(ownersReq) && ownersReq.length > 0) {
    // filter.tags = { $in: tags };
    filter.$or = filter.$or || [];
    filter.$or.push({ owners: { $in: ownersReq } });
  }

  const totalCollabs = await Collab.countDocuments(filter);
  const totalPages = Math.ceil(totalCollabs / limit);

  try {
    const collabs = await Collab.find(filter)
      .populate({
        path: "owners",
        select: "_id username name",
      })
      .populate("associatedProject", "_id projectName")
    .skip((page - 1) * limit)
    .limit(limit).exec();
    res.status(200).json({
      collabs,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching collabs");
  }
  // return all the collabs, or collabs of a user if owner_id is specified
});

// @desc    Get collab
// route    GET /api/collab/id
// @access  Public
const getCollabById = asyncHandler(async (req, res) => {
  const { collab_id } = req.query;

  if (!collab_id) {
    res.status(400);
    throw new Error("Specify collab id");
  }

  let query = { collab_id: collab_id };

  try {
    const collab = await Collab.findOne(query)
      .populate({
        path: "owners",
        select: "_id username name",
      })
      .populate("associatedProject", "_id projectName")
      .exec();
    res.status(200).json(collab);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching collabs");
  }
});

// @desc    Get collab
// route    GET /api/collab/id
// @access  Public
const getCollabByProjectId = asyncHandler(async (req, res) => {
  const { associatedProject_id } = req.query;
  if (!associatedProject_id) {
    res.status(400);
    throw new Error("Specify project id");
  }
  const filter = {
    associatedProject: associatedProject_id,
  };
  try {
    const collab = await Collab.findOne(filter)
      .populate({
        path: "owners",
        select: "_id username name",
      })
      .populate("associatedProject", "_id projectName")
      .exec();
    res.status(200).json({ collabId: collab?.collab_id });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching collabs");
  }
});

const addOwnerToCollab = asyncHandler(async (req, res) => {
  const { collabId, ownerId, ownerName, ownerUsername } = req.body;
  if (!collabId || !ownerId) {
    res.status(400);
    throw new Error("Provide all required data");
  }
  const collab = await Collab.findOne({ collab_id: collabId });
  const ownerExists = collab.owners.some(
    (owner) => owner._id.toString() === ownerId
  );
  if (ownerExists) {
    res.status(400);
    throw new Error("Owner already exists in the collab");
  }
  const updatedCollab = await Collab.findOneAndUpdate(
    { collab_id: collabId },
    {
      $push: { owners: { $each: [ownerId], $position: 0 } },
    },
    { new: true }
  )
    .populate({
      path: "owners",
      select: "_id username name",
    })
    .populate("associatedProject", "_id projectName")
    .exec();

  res.status(200).json({ success: true, data: updatedCollab });
});

export {
  createCollab,
  getCollab,
  getCollabById,
  addOwnerToCollab,
  getCollabByProjectId,
};
