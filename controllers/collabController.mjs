import asyncHandler from "express-async-handler";
import Collab from "../models/collabModel.js";
import Project from "../models/projectModel.js";


// @desc    Create collab, assign it to user
// route    POST /api/collab
// @access  Public
const createCollab = asyncHandler(async (req, res) => {
    const { username, _id, name } = req.user;
    const autor = { _id, name, username };
    const {
      collab_id,
      associatedProject_id,
      associatedProject_name,
    } = req.body;

    if (
      !collab_id ||
      !associatedProject_id ||
      !associatedProject_name
    ) {
      res.status(400);
      throw new Error("Cannot create without required data");
    }
    
    const associatedProject = {
      _id: associatedProject_id,
      name: associatedProject_name,
    };

    try {
       const collab = await Collab.create({
         collab_id: collab_id,
         owner: autor,
         associatedProject,
       });
       res.status(200).json(collab);
    } catch (error) {
      // Handle duplicate key error for unique id
      if (error.code === 11000) {
        res.status(400);
        throw new Error("Collab ID must be unique");
      } else {
        res.status(500);
        throw new Error("Error creating collab");
      }
    }
});

// @desc    Get collabs
// route    GET /api/collab
// @access  Public
const getCollab = asyncHandler(async (req, res) => {
    const { owner_id } = req.query;

    let query = {};

    // If owner_id is specified, filter by owner_id
    if (owner_id) {
      query["owner._id"] = owner_id;
    }

    try {
      const collabs = await Collab.find(query);
      res.status(200).json(collabs);
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
    const {
        collab_id,
        owner_id,
    } = req.query;

    if (!collab_id){
        res.status(400);
        throw new Error("Specify collab id");
    }

    let query = { _id: collab_id };

    try {
      const collab = await Collab.findOne(query);
      res.status(200).json(collab);
    } catch (error) {
      res.status(500);
      throw new Error("Error fetching collabs");
    }
});

export { createCollab, getCollab, getCollabById };