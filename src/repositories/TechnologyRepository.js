// Technology Repository
class TechnologyRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(technologyData) {
    return await this.prisma.technology.create({
      data: technologyData
    });
  }

  async findById(id) {
    return await this.prisma.technology.findUnique({
      where: { id }
    });
  }

  async findAll() {
    return await this.prisma.technology.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }

  async findByName(name) {
    return await this.prisma.technology.findFirst({
      where: { name }
    });
  }

  async findByIds(ids) {
    return await this.prisma.technology.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }

  async update(id, technologyData) {
    return await this.prisma.technology.update({
      where: { id },
      data: technologyData
    });
  }

  async delete(id) {
    return await this.prisma.technology.delete({
      where: { id }
    });
  }

  async exists(id) {
    const technology = await this.prisma.technology.findUnique({
      where: { id },
      select: { id: true }
    });
    return !!technology;
  }

  async existsByName(name) {
    const technology = await this.prisma.technology.findFirst({
      where: { name },
      select: { id: true }
    });
    return !!technology;
  }
}

module.exports = TechnologyRepository;