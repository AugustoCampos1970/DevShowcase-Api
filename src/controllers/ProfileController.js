// Profile Controller
class ProfileController {
  constructor(profileService) {
    this.profileService = profileService;
  }

  async createProfile(req, res, next) {
    try {
      const profileData = req.validatedData;
      const profile = await this.profileService.createProfile(profileData);
      
      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfileById(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await this.profileService.getProfileById(id);
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProfiles(req, res, next) {
    try {
      const profiles = await this.profileService.getAllProfiles();
      
      res.status(200).json({
        success: true,
        count: profiles.length,
        data: profiles
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profileData = req.validatedData;
      
      const updatedProfile = await this.profileService.updateProfile(id, profileData);
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req, res, next) {
    try {
      const { id } = req.params;
      await this.profileService.deleteProfile(id);
      
      res.status(200).json({
        success: true,
        message: 'Profile deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;