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

  async findById(id) {
    const organizationRecord = await organizationQueries.findById(id);
    return organizationRecord ? new Organization(organizationRecord) : null;
  }

  /**
   * Adds a user to an organization with a specific role.
   * @param {Object} params - Parameters for adding a user
   * @param {number} params.user_id - User ID
   * @param {number} params.organization_id - Organization ID
   * @param {string} params.role - Role of the user in the organization
   * @returns {Object} - The added user-organization relationship record
   */
  async addUser({ user_id, organization_id, role }) {
    const userOrganizationRecord = await organizationQueries.addUserToOrganization({
      user_id,
      organization_id,
      role,
    });
    return userOrganizationRecord; // Returns the raw database record
  }
}

module.exports = OrganizationRepository;
