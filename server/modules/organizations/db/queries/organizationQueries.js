// src/modules/organizations/db/queries/organizationQueries.js

const knex = require('../../../../infrastructure/database/connection');

const organizationQueries = {
  /**
   * Creates a new organization
   * @param {Object} params
   * @param {string} params.name - Organization name
   * @returns {Object} The created organization
   */
  async createOrganization({ name }) {
    const [organization] = await knex('organizations')
      .insert({
        name,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning(['id', 'name', 'created_at', 'updated_at']);
    return organization;
  },

  /**
   * Checks if an organization with the given name already exists
   * @param {string} name - The name of the organization to check
   * @returns {Object|null} The organization if it exists, or null
   */
  async findByName(name) {
    return knex('organizations').where({ name }).first();
  },
};

module.exports = organizationQueries;
