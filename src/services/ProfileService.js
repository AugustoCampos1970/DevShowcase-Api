const AppError = require('../errors/AppError');

// Profile Service
class ProfileService {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async createProfile(profileData) {
    return await this.profileRepository.create(profileData);
  }

  async getProfileById(id) {
    const profile = await this.profileRepository.findById(id);
    
    if (!profile) {
      throw new AppError('Profile not found', 404);
    }
    
    return profile;
  }

  async getAllProfiles() {
    return await this.profileRepository.findAll();
  }

  async updateProfile(id, profileData) {
    const exists = await this.profileRepository.exists(id);
    
    if (!exists) {
      throw new AppError('Profile not found', 404);
    }
    
    return await this.profileRepository.update(id, profileData);
  }

  async deleteProfile(id) {
    const exists = await this.profileRepository.exists(id);
    
    if (!exists) {
      throw new AppError('Profile not found', 404);
    }
    
    return await this.profileRepository.delete(id);
  }

  async profileExists(id) {
    return await this.profileRepository.exists(id);
  }
}

module.exports = ProfileService;