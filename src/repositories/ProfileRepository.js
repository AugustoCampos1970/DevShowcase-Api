// Profile Repository
class ProfileRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(profileData) {
    return await this.prisma.profile.create({
      data: profileData
    });
  }

  async findById(id) {
    return await this.prisma.profile.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            technologies: true
          }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.profile.findMany({
      include: {
        projects: {
          include: {
            technologies: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async update(id, profileData) {
    return await this.prisma.profile.update({
      where: { id },
      data: profileData
    });
  }

  async delete(id) {
    return await this.prisma.profile.delete({
      where: { id }
    });
  }

  async exists(id) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      select: { id: true }
    });
    return !!profile;
  }
}

module.exports = ProfileRepository;