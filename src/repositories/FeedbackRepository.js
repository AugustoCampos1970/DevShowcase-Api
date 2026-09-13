// Feedback Repository
class FeedbackRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(feedbackData) {
    return await this.prisma.feedback.create({
      data: feedbackData
    });
  }

  async findById(id) {
    return await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        project: true
      }
    });
  }

  async findAllByProject(projectId) {
    return await this.prisma.feedback.findMany({
      where: { projectId },
      include: {
        project: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async update(id, feedbackData) {
    return await this.prisma.feedback.update({
      where: { id },
      data: feedbackData
    });
  }

  async delete(id) {
    return await this.prisma.feedback.delete({
      where: { id }
    });
  }

  async exists(id) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      select: { id: true }
    });
    return !!feedback;
  }

  async getAverageRating(projectId) {
    const result = await this.prisma.feedback.aggregate({
      where: { projectId },
      _avg: {
        rating: true
      },
      _count: {
        rating: true
      }
    });

    return {
      average: result._avg.rating,
      count: result._count.rating
    };
  }
}

module.exports = FeedbackRepository;