const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const AppError = require('./errors/AppError');
const prisma = new PrismaClient();

// Import Swagger documentation
const swaggerDocs = require('./utils/swagger');

// Import repositories
const ProfileRepository = require('./repositories/ProfileRepository');
const TechnologyRepository = require('./repositories/TechnologyRepository');
const ProjectRepository = require('./repositories/ProjectRepository');
const FeedbackRepository = require('./repositories/FeedbackRepository');

// Import services
const ProfileService = require('./services/ProfileService');
const TechnologyService = require('./services/TechnologyService');
const ProjectService = require('./services/ProjectService');
const FeedbackService = require('./services/FeedbackService');

// Import routes
const { router: apiRouter, initializeControllers } = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize dependencies
const profileRepository = new ProfileRepository(prisma);
const technologyRepository = new TechnologyRepository(prisma);
const projectRepository = new ProjectRepository(prisma);
const feedbackRepository = new FeedbackRepository(prisma);

const profileService = new ProfileService(profileRepository);
const technologyService = new TechnologyService(technologyRepository);
const feedbackService = new FeedbackService(feedbackRepository);
const projectService = new ProjectService(
  projectRepository,
  profileService,
  technologyService,
  feedbackRepository
);

// Initialize controllers with dependencies
initializeControllers({
  profileService,
  technologyService,
  projectService,
  feedbackService
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'DevShowcase API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Base API route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to DevShowcase API',
    version: '1.0.0',
    endpoints: {
      profiles: '/api/profiles',
      projects: '/api/projects',
      technologies: '/api/technologies',
      feedbacks: '/api/feedbacks'
    },
    documentation: '/docs',
    health: '/health'
  });
});

// API routes
app.use('/api', apiRouter);

// Swagger documentation
swaggerDocs(app, PORT);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message
    });
  }

  // Malformed JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Invalid JSON in request body'
    });
  }

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: 'Conflict',
      message: 'A record with this value already exists'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'Record not found'
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API: http://localhost:${PORT}/api`);
  console.log(`📖 Documentation: http://localhost:${PORT}/docs`);
});

module.exports = { app, server, prisma };