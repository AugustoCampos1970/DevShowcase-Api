// Project Repository
class ProjectRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(projectData) {
    const { technologyIds, ...projectWithoutTechs } = projectData;
    
    return await this.prisma.project.create({
      data: {
        ...projectWithoutTechs,
        technologies: {
          connect: technologyIds.map(id => ({ id }))
        }
      },
      include: {
        profile: true,
        technologies: true
      }
    });
  }

  async findById(id) {
    return await this.prisma.project.findUnique({
      where: { id },
      include: {
        profile: true,
        technologies: true,
        feedbacks: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }

  async findAll(filters = {}) {
    const { technology, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;
    
    const where = {};
    
    if (technology) {
      where.technologies = {
        some: {
          name: technology
        }
      };
    }
    
    return await this.prisma.project.findMany({
      where,
      include: {
        profile: true,
        technologies: true,
        feedbacks: true
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async update(id, projectData) {
    const { technologyIds, ...projectWithoutTechs } = projectData;
    
    return await this.prisma.project.update({
      where: { id },
      data: {
        ...projectWithoutTechs,
        technologies: {
          set: technologyIds.map(id => ({ id }))
        }
      },
      include: {
        profile: true,
        technologies: true
      }
    });
  }

  async delete(id) {
    return await this.prisma.project.delete({
      where: { id }
    });
  }

  async incrementLikes(id) {
    return await this.prisma.project.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    });
  }

  async updateAverageRating(projectId) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        feedbacks: {
          select: {
            rating: true
          }
        }
      }
    });

    if (!project || project.feedbacks.length === 0) {
      return await this.prisma.project.update({
        where: { id: projectId },
        data: {
          averageRating: null
        }
      });
    }

    const totalRating = project.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = totalRating / project.feedbacks.length;

    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        averageRating: parseFloat(averageRating.toFixed(2))
      }
    });
  }

  async exists(id) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true }
    });
    return !!project;
  }

  async getTotalCount(filters = {}) {
    const { technology } = filters;
    
    const where = {};
    
    if (technology) {
      where.technologies = {
        some: {
          name: technology
        }
      };
    }
    
    return await this.prisma.project.count({ where });
  }
}

module.exports = ProjectRepository;