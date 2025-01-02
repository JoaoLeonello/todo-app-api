const organizationQueries = require('../db/queries/organizationQueries');
const Organization = require('../domain/Organization');

class OrganizationRepository {
  /**
   * Creates a new organization in the database.
   * @param {Object} organizationData - Organization data
   * @param {string} organizationData.name - Organization's name
   * @returns {Organization} - The created Organization domain entity
   */
  async create(organizationData) {
    const organizationRecord = await organizationQueries.createOrganization(organizationData);
    return new Organization(organizationRecord); // Returns a domain entity instance
  }

  /**
   * Finds an organization by name.
   * @param {string} name - Organization's name
   * @returns {Organization|null} - Organization Domain or null if not found
   */
  async findByName(name) {
    const organizationRecord = await organizationQueries.findByName(name);
    return organizationRecord ? new Organization(organizationRecord) : null;
  }
}

module.exports = OrganizationRepository;
