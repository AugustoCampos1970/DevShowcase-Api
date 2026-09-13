const express = require('express');
const router = express.Router();

// Import validation middleware
const {
  validateProfile,
  validateTechnology,
  validateProject,
  validateFeedback,
  validateId
} = require('../dtos/validation');

// Import controllers (will be injected later)
let profileController;
let technologyController;
let projectController;
let feedbackController;

// Initialize controllers with dependencies
const initializeControllers = (dependencies) => {
  const {
    profileService,
    technologyService,
    projectService,
    feedbackService
  } = dependencies;
  
  const ProfileController = require('../controllers/ProfileController');
  const TechnologyController = require('../controllers/TechnologyController');
  const ProjectController = require('../controllers/ProjectController');
  const FeedbackController = require('../controllers/FeedbackController');
  
  profileController = new ProfileController(profileService);
  technologyController = new TechnologyController(technologyService);
  projectController = new ProjectController(projectService);
  feedbackController = new FeedbackController(feedbackService);
};

// Profile routes
router.post('/profiles', validateProfile, (req, res, next) => {
  profileController.createProfile(req, res, next);
});

router.get('/profiles/:id', validateId, (req, res, next) => {
  profileController.getProfileById(req, res, next);
});

router.get('/profiles', (req, res, next) => {
  profileController.getAllProfiles(req, res, next);
});

// Technology routes
router.post('/technologies', validateTechnology, (req, res, next) => {
  technologyController.createTechnology(req, res, next);
});

router.get('/technologies', (req, res, next) => {
  technologyController.getAllTechnologies(req, res, next);
});

router.get('/technologies/:id', validateId, (req, res, next) => {
  technologyController.getTechnologyById(req, res, next);
});

// Project routes
router.post('/projects', validateProject, (req, res, next) => {
  projectController.createProject(req, res, next);
});

router.get('/projects', (req, res, next) => {
  projectController.getAllProjects(req, res, next);
});

router.get('/projects/:id', validateId, (req, res, next) => {
  projectController.getProjectById(req, res, next);
});

router.put('/projects/:id/upvote', validateId, (req, res, next) => {
  projectController.upvoteProject(req, res, next);
});

// Feedback routes (for projects)
router.post('/projects/:id/feedbacks', validateId, validateFeedback, (req, res, next) => {
  projectController.addFeedback(req, res, next);
});

router.get('/projects/:projectId/feedbacks', validateId, (req, res, next) => {
  feedbackController.getFeedbacksByProject(req, res, next);
});

router.get('/feedbacks/:id', validateId, (req, res, next) => {
  feedbackController.getFeedbackById(req, res, next);
});

router.get('/projects/:projectId/average-rating', validateId, (req, res, next) => {
  feedbackController.getAverageRating(req, res, next);
});

module.exports = {
  router,
  initializeControllers
};