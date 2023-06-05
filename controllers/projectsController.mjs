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
  const page = parseInt(req.query?.page) || 1; 
  const projectName = req.query?.projectName;
  const authorId = req.query?.authorId;
  let languages = req.query?.language?.split(",") || [];
  languages = languages.filter((lang) => lang !== "");
  const limit = 4; // Number of projects per page
  const sortObj = { updatedAt: -1 }; // Sort by updatedAt in descending order
  let filter = {};

  if (projectName) {
    filter.projectName = { $regex: new RegExp(projectName, "i") };
  }

  if (authorId) {
    filter["author._id"] = authorId;
  }

  if (languages && Array.isArray(languages) && languages.length > 0) {
    filter.$or = filter.$or || [];
    filter.$or.push({ language: { $in: languages } });
  }

  const totalProjects = await Project.countDocuments(filter);
  const totalPages = Math.ceil(totalProjects / limit);

  const projects = await Project.find(filter)
    .select(
      "_id author projectName language codeFile createdAt updatedAt isPublic"
    )
    .populate("author", "_id name username")
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  res.status(200).json({
    projects,
    totalPages,
    currentPage: page,
  });
});

// @desc    Get project by ID
// route    GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.query.id;

  const project = await Project.findById(projectId).populate(
    "author",
    "_id name username"
  );

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});
// @desc    Update project by ID
// route    PUT /api/projects/:id
// @access  Public
const updateProjectById = asyncHandler(async (req, res) => {
  const authorId = req.user._id;
  const { projectId, projectName, codeFile } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  if (authorId.toString() != project.author._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this project");
  }

  project.projectName = projectName || project.projectName;
  project.codeFile = codeFile || project.codeFile;

  const updatedProject = await project.save();

  res.status(200).json(updatedProject);
});

// @desc    Delete project by ID
// route    PUT /api/projects/:id
// @access  Public
const deleteProjectById = asyncHandler(async (req, res) => {
  const authorId = req.user._id;
  const { projectId} = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  if (authorId.toString() != project.author._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this project");
  }

  await project.remove();
  res.status(200).json({ success: true, message: "Project deleted" });
});

export {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
