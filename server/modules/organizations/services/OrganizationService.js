const Organization = require('../domain/Organization');

class OrganizationService {
  constructor(organizationRepository) {
    this.organizationRepository = organizationRepository;
  }

  /**
   * Creates a new organization.
   * @param {Object} organizationData - Organization data
   * @param {string} organizationData.name - Organization's name
   * @returns {Organization} - The created Organization domain entity
   * @throws {Error} - If the organization name already exists
   */
  async createOrganization({ name }) {
    // Check if an organization with the given name already exists
    const existingOrganization = await this.organizationRepository.findByName(name);
    if (existingOrganization) {
      throw new Error('Organization name already exists.');
    }

    // Prepare organization data
    const organizationData = { name };

    try {
      // Create and return the new organization
      const createdOrganization = await this.organizationRepository.create(organizationData);
      console.log('Organization successfully created:', createdOrganization);
      return new Organization(createdOrganization);
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  }
}

module.exports = OrganizationService;
