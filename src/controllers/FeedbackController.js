// Feedback Controller
class FeedbackController {
  constructor(feedbackService) {
    this.feedbackService = feedbackService;
  }

  async createFeedback(req, res, next) {
    try {
      const { projectId } = req.params;
      const feedbackData = req.validatedData;
      
      const feedback = await this.feedbackService.createFeedback(projectId, feedbackData);
      
      res.status(201).json({
        success: true,
        message: 'Feedback created successfully',
        data: feedback
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeedbackById(req, res, next) {
    try {
      const { id } = req.params;
      const feedback = await this.feedbackService.getFeedbackById(id);
      
      res.status(200).json({
        success: true,
        data: feedback
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeedbacksByProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const feedbacks = await this.feedbackService.getFeedbacksByProject(projectId);
      
      res.status(200).json({
        success: true,
        count: feedbacks.length,
        data: feedbacks
      });
    } catch (error) {
      next(error);
    }
  }

  async updateFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const feedbackData = req.validatedData;
      
      const updatedFeedback = await this.feedbackService.updateFeedback(id, feedbackData);
      
      res.status(200).json({
        success: true,
        message: 'Feedback updated successfully',
        data: updatedFeedback
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFeedback(req, res, next) {
    try {
      const { id } = req.params;
      await this.feedbackService.deleteFeedback(id);
      
      res.status(200).json({
        success: true,
        message: 'Feedback deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAverageRating(req, res, next) {
    try {
      const { projectId } = req.params;
      const ratingStats = await this.feedbackService.getAverageRating(projectId);
      
      res.status(200).json({
        success: true,
        data: ratingStats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FeedbackController;