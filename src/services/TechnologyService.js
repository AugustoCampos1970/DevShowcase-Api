// Technology Service
class TechnologyService {
  constructor(technologyRepository) {
    this.technologyRepository = technologyRepository;
  }

  async createTechnology(technologyData) {
    // Check if technology with same name already exists
    const existingTechnology = await this.technologyRepository.findByName(technologyData.name);
    
    if (existingTechnology) {
      throw new Error('Technology with this name already exists');
    }
    
    return await this.technologyRepository.create(technologyData);
  }

  async getTechnologyById(id) {
    const technology = await this.technologyRepository.findById(id);
    
    if (!technology) {
      throw new Error('Technology not found');
    }
    
    return technology;
  }

  async getAllTechnologies() {
    return await this.technologyRepository.findAll();
  }

  async updateTechnology(id, technologyData) {
    const exists = await this.technologyRepository.exists(id);
    
    if (!exists) {
      throw new Error('Technology not found');
    }
    
    // Check if new name conflicts with existing technology
    if (technologyData.name) {
      const existingWithName = await this.technologyRepository.findByName(technologyData.name);
      if (existingWithName && existingWithName.id !== id) {
        throw new Error('Technology with this name already exists');
      }
    }
    
    return await this.technologyRepository.update(id, technologyData);
  }

  async deleteTechnology(id) {
    const exists = await this.technologyRepository.exists(id);
    
    if (!exists) {
      throw new Error('Technology not found');
    }
    
    return await this.technologyRepository.delete(id);
  }

  async technologyExists(id) {
    return await this.technologyRepository.exists(id);
  }

  async getTechnologiesByIds(ids) {
    return await this.technologyRepository.findByIds(ids);
  }
}

module.exports = TechnologyService;