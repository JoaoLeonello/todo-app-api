const Organization = require("../domain/Organization");

class OrganizationService {
  constructor(organizationRepository, userRepository) {
    this.organizationRepository = organizationRepository;
    this.userRepository = userRepository;
  }

  /**
   * Creates a new organization.
   * @param {Object} organizationData - Organization data
   * @param {string} organizationData.name - Organization's name
   * @returns {Organization} - The created Organization domain entity
   * @throws {Error} - If the organization name already exists
   */
  async createOrganization({ name }) {
    const existingOrganization = await this.organizationRepository.findByName(
      name,
    );
    if (existingOrganization) {
      throw new Error("Organization name already exists.");
    }

    const organizationData = { name };

    try {
      const createdOrganization = await this.organizationRepository.create(
        organizationData,
      );
      console.log("Organization successfully created:", createdOrganization);
      return new Organization(createdOrganization);
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error;
    }
  }

  /**
   * Adds a user to an organization with a specified role.
   * @param {Object} params - Parameters for adding a user
   * @param {number} params.user_id - User ID
   * @param {string} params.role - Role of the user in the organization
   * @throws {Error} - If the user ID does not exist or the role is invalid
   */
  async addUserToOrganization({ user_id, org_id, role }) {
    // Validate user ID
    const userExists = await this.userRepository.findById(user_id);
    if (!userExists) {
      throw new Error(`User with ID ${user_id} does not exist.`);
    }

    // Validate organization ID
    const organizationExists = await this.organizationRepository.findById(
      org_id,
    );
    if (!organizationExists) {
      throw new Error(`Organization with ID ${org_id} does not exist.`);
    }

    // Validate role
    const validRoles = ["admin", "member"];
    if (!validRoles.includes(role)) {
      throw new Error(
        `Invalid role: ${role}. Role must be one of: ${validRoles.join(", ")}`,
      );
    }

    // Add user to the organization
    try {
      const result = await this.organizationRepository.addUser({
        user_id,
        organization_id: org_id,
        role,
      });
      console.log("User successfully added to organization:", result);
      return result;
    } catch (error) {
      console.error("Error adding user to organization:", error);
      throw error;
    }
  }
}

module.exports = OrganizationService;
