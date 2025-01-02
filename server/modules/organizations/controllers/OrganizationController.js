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

    async addUserToOrganization(req, res) {
      try {
        const { orgId } = req.params;
        const { user_id, role } = req.body;
        const userAdded = await this.organizationService.addUserToOrganization({
          user_id,
          org_id: orgId,
          role
      });
      return res.status(201).json({ data: userAdded });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = OrganizationController;
  