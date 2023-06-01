import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

// @desc    Create project, assign it to user
// route    POST /api/projectss
// @access  Public
const createProject = asyncHandler(async (req, res) => {
    const { username, _id, name } = req.user;
    const { projectName, language, codeFile } = req.body;
    const author = { _id, name, username };
    if (!projectName || !language || !codeFile) {
      res.status(400);
      throw new Error("Provide all the required data");
    }
    const project = await Project.create({
      author,
      projectName,
      language,
      codeFile,
      isPublic: false,
    });
    res.status(200).json({
      _id: project._id,
      author: project.author,
      projectName: project.projectName,
      language: project.language,
      codeFile: project.codeFile,
      createdAt: project.createdAt,
      isPublic: project.isPublic,
    });
});

// @desc    Get all projects
// route    GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).populate("author", "_id name username");
  
  res.status(200).json(projects);
});

// @desc    Get project by ID
// route    GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.query.id;

  const project = await Project.findById(projectId).populate("author", "_id name username");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});

export {
  createProject,
  getProjects,
  getProjectById,
};