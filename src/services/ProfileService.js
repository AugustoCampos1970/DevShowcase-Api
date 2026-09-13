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
      throw new Error('Profile not found');
    }
    
    return profile;
  }

  async getAllProfiles() {
    return await this.profileRepository.findAll();
  }

  async updateProfile(id, profileData) {
    const exists = await this.profileRepository.exists(id);
    
    if (!exists) {
      throw new Error('Profile not found');
    }
    
    return await this.profileRepository.update(id, profileData);
  }

  async deleteProfile(id) {
    const exists = await this.profileRepository.exists(id);
    
    if (!exists) {
      throw new Error('Profile not found');
    }
    
    return await this.profileRepository.delete(id);
  }

  async profileExists(id) {
    return await this.profileRepository.exists(id);
  }
}

module.exports = ProfileService;