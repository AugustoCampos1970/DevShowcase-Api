// Project Service
class ProjectService {
  constructor(projectRepository, profileService, technologyService, feedbackRepository) {
    this.projectRepository = projectRepository;
    this.profileService = profileService;
    this.technologyService = technologyService;
    this.feedbackRepository = feedbackRepository;
  }

  async createProject(projectData) {
    const { profileId, technologyIds } = projectData;
    
    // Check if profile exists
    const profileExists = await this.profileService.profileExists(profileId);
    if (!profileExists) {
      throw new Error('Profile not found');
    }
    
    // Check if all technologies exist
    const technologies = await this.technologyService.getTechnologiesByIds(technologyIds);
    if (technologies.length !== technologyIds.length) {
      throw new Error('One or more technologies not found');
    }
    
    return await this.projectRepository.create(projectData);
  }

  async getProjectById(id) {
    const project = await this.projectRepository.findById(id);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    return project;
  }

  async getAllProjects(filters = {}) {
    const { technology, page = 1, limit = 10 } = filters;
    
    if (page < 1 || limit < 1) {
      throw new Error('Page and limit must be positive numbers');
    }
    
    const projects = await this.projectRepository.findAll({ technology, page, limit });
    const total = await this.projectRepository.getTotalCount({ technology });
    
    return {
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    };
  }

  async updateProject(id, projectData) {
    const exists = await this.projectRepository.exists(id);
    
    if (!exists) {
      throw new Error('Project not found');
    }
    
    const { profileId, technologyIds } = projectData;
    
    // Check if profile exists
    if (profileId) {
      const profileExists = await this.profileService.profileExists(profileId);
      if (!profileExists) {
        throw new Error('Profile not found');
      }
    }
    
    // Check if all technologies exist
    if (technologyIds && technologyIds.length > 0) {
      const technologies = await this.technologyService.getTechnologiesByIds(technologyIds);
      if (technologies.length !== technologyIds.length) {
        throw new Error('One or more technologies not found');
      }
    }
    
    return await this.projectRepository.update(id, projectData);
  }

  async deleteProject(id) {
    const exists = await this.projectRepository.exists(id);
    
    if (!exists) {
      throw new Error('Project not found');
    }
    
    return await this.projectRepository.delete(id);
  }

  async incrementLikes(id) {
    const exists = await this.projectRepository.exists(id);
    
    if (!exists) {
      throw new Error('Project not found');
    }
    
    return await this.projectRepository.incrementLikes(id);
  }

  async addFeedback(projectId, feedbackData) {
    const projectExists = await this.projectRepository.exists(projectId);
    
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    const feedback = await this.feedbackRepository.create({
      ...feedbackData,
      projectId
    });
    
    // Update project average rating
    await this.projectRepository.updateAverageRating(projectId);
    
    return feedback;
  }

  async projectExists(id) {
    return await this.projectRepository.exists(id);
  }
}

module.exports = ProjectService;