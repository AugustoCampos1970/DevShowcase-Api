const { z } = require('zod');

// Profile DTOs
const profileRequestSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  bio: z.string().max(2000, 'Bio too long').optional(),
  avatarUrl: z.string().url('Invalid URL format').max(500, 'URL too long').optional(),
  githubUrl: z.string().url('Invalid URL format').max(500, 'URL too long').optional(),
});

const profileResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Technology DTOs
const technologyRequestSchema = z.object({
  name: z.string().min(1, 'Technology name is required').max(100, 'Name too long'),
});

const technologyResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  createdAt: z.date(),
});

// Project DTOs
const projectRequestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().max(5000, 'Description too long').optional(),
  repositoryUrl: z.string().url('Invalid URL format').max(500, 'URL too long').optional(),
  liveUrl: z.string().url('Invalid URL format').max(500, 'URL too long').optional(),
  profileId: z.number().int().positive('Profile ID is required'),
  technologyIds: z.array(z.number().int().positive()).min(1, 'At least one technology is required'),
});

const projectResponseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().nullable(),
  repositoryUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  likes: z.number().int().nonnegative(),
  averageRating: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  profile: profileResponseSchema,
  technologies: z.array(technologyResponseSchema),
});

// Feedback DTOs
const feedbackRequestSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().max(2000, 'Comment too long').optional(),
  authorName: z.string().min(1, 'Author name is required').max(255, 'Author name too long'),
});

const feedbackResponseSchema = z.object({
  id: z.number().int().positive(),
  rating: z.number(),
  comment: z.string().nullable(),
  authorName: z.string(),
  createdAt: z.date(),
  projectId: z.number().int().positive(),
});

// Validation functions
const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    const validationErrors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid request data',
      details: validationErrors
    });
  }
};

// Export schemas and validation functions
module.exports = {
  // Schemas
  profileRequestSchema,
  profileResponseSchema,
  technologyRequestSchema,
  technologyResponseSchema,
  projectRequestSchema,
  projectResponseSchema,
  feedbackRequestSchema,
  feedbackResponseSchema,
  
  // Validation middleware
  validateProfile: validate(profileRequestSchema),
  validateTechnology: validate(technologyRequestSchema),
  validateProject: validate(projectRequestSchema),
  validateFeedback: validate(feedbackRequestSchema),
  
  // Helper functions
  validateId: (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid ID format',
        details: [{ field: 'id', message: 'ID must be a positive integer' }]
      });
    }
    req.params.id = id;
    next();
  }
};