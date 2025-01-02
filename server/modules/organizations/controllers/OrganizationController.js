// controllers/OrganizationController.js

class OrganizationController {
    constructor(organizationService) {
      this.organizationService = organizationService;
    }
  
    async createOrganization(req, res) {
      try {
        const { name } = req.body;
        const newOrganization = await this.organizationService.createOrganization({
            name
        });
        return res.status(201).json({ data: newOrganization.toJSON() });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = OrganizationController;
  