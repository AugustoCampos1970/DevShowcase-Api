const AppError = require('../errors/AppError');

// Feedback Service
class FeedbackService {
  constructor(feedbackRepository, projectService) {
    this.feedbackRepository = feedbackRepository;
    this.projectService = projectService;
  }

  async createFeedback(projectId, feedbackData) {
    const projectExists = await this.projectService.projectExists(projectId);
    
    if (!projectExists) {
      throw new AppError('Project not found', 404);
    }
    
    const feedback = await this.feedbackRepository.create({
      ...feedbackData,
      projectId
    });
    
    return feedback;
  }

  async getFeedbackById(id) {
    const feedback = await this.feedbackRepository.findById(id);
    
    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }
    
    return feedback;
  }

  async getFeedbacksByProject(projectId) {
    const projectExists = await this.projectService.projectExists(projectId);
    
    if (!projectExists) {
      throw new AppError('Project not found', 404);
    }
    
    return await this.feedbackRepository.findAllByProject(projectId);
  }

  async updateFeedback(id, feedbackData) {
    const exists = await this.feedbackRepository.exists(id);
    
    if (!exists) {
      throw new AppError('Feedback not found', 404);
    }
    
    return await this.feedbackRepository.update(id, feedbackData);
  }

  async deleteFeedback(id) {
    const exists = await this.feedbackRepository.exists(id);
    
    if (!exists) {
      throw new AppError('Feedback not found', 404);
    }
    
    const feedback = await this.feedbackRepository.findById(id);
    const projectId = feedback.projectId;
    
    const deleted = await this.feedbackRepository.delete(id);
    
    return deleted;
  }

  async getAverageRating(projectId) {
    const projectExists = await this.projectService.projectExists(projectId);
    
    if (!projectExists) {
      throw new AppError('Project not found', 404);
    }
    
    return await this.feedbackRepository.getAverageRating(projectId);
  }
}

module.exports = FeedbackService;