// Project Controller
class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  async createProject(req, res, next) {
    try {
      const projectData = req.validatedData;
      const project = await this.projectService.createProject(projectData);
      
      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const { technology, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (technology) filters.technology = technology;
      if (page) filters.page = parseInt(page);
      if (limit) filters.limit = parseInt(limit);
      
      const result = await this.projectService.getAllProjects(filters);
      
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const projectData = req.validatedData;
      
      const updatedProject = await this.projectService.updateProject(id, projectData);
      
      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);
      
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async upvoteProject(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProject = await this.projectService.incrementLikes(id);
      
      res.status(200).json({
        success: true,
        message: 'Project upvoted successfully',
        data: updatedProject
      });
    } catch (error) {
      next(error);
    }
  }

  async addFeedback(req, res, next) {
    try {
      const { id: projectId } = req.params;
      const feedbackData = req.validatedData;
      
      const feedback = await this.projectService.addFeedback(projectId, feedbackData);
      
      res.status(201).json({
        success: true,
        message: 'Feedback added successfully',
        data: feedback
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;