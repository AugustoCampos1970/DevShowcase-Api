// Technology Controller
class TechnologyController {
  constructor(technologyService) {
    this.technologyService = technologyService;
  }

  async createTechnology(req, res, next) {
    try {
      const technologyData = req.validatedData;
      const technology = await this.technologyService.createTechnology(technologyData);
      
      res.status(201).json({
        success: true,
        message: 'Technology created successfully',
        data: technology
      });
    } catch (error) {
      next(error);
    }
  }

  async getTechnologyById(req, res, next) {
    try {
      const { id } = req.params;
      const technology = await this.technologyService.getTechnologyById(id);
      
      res.status(200).json({
        success: true,
        data: technology
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTechnologies(req, res, next) {
    try {
      const technologies = await this.technologyService.getAllTechnologies();
      
      res.status(200).json({
        success: true,
        count: technologies.length,
        data: technologies
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTechnology(req, res, next) {
    try {
      const { id } = req.params;
      const technologyData = req.validatedData;
      
      const updatedTechnology = await this.technologyService.updateTechnology(id, technologyData);
      
      res.status(200).json({
        success: true,
        message: 'Technology updated successfully',
        data: updatedTechnology
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTechnology(req, res, next) {
    try {
      const { id } = req.params;
      await this.technologyService.deleteTechnology(id);
      
      res.status(200).json({
        success: true,
        message: 'Technology deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TechnologyController;