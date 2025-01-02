// src/domain/Organization.js

class Organization {
    /**
     * Creates a new instance of Organization
     * @param {Object} params
     * @param {number} params.id - Organization ID
     * @param {string} params.name - Organization name
     * @param {Date} params.createdAt - Creation date
     * @param {Date} params.updatedAt - Last update date
     */
    constructor({ id, name, createdAt, updatedAt }) {
      this.id = id;
      this.name = name;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
    }
  
    /**
     * Updates organization data
     * @param {Object} updates - Fields to be updated
     * @param {string} [updates.name] - New name
     * @param {Date} [updates.updatedAt] - New update date
     */
    update({ name, updatedAt }) {
      if (name !== undefined) this.name = name;
      if (updatedAt !== undefined) this.updatedAt = updatedAt;
      else this.updatedAt = new Date(); // Automatically set to current date if not provided
    }
  
    /**
     * Returns a JSON representation of the organization
     * @returns {Object}
     */
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }
  
  module.exports = Organization;
  