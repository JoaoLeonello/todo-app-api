// src/domain/User.js

class User {
  /**
   * Creates a new instance of User
   * @param {Object} params
   * @param {number} params.id - User ID
   * @param {string} params.name - User name
   * @param {string} params.email - User email
   * @param {string} params.passwordHash - User hashed password
   * @param {Date} params.createdAt - Creation date
   * @param {Date} params.updatedAt - Last update date
   */
  constructor({ id, name, email, passwordHash, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Updates user data
   * @param {Object} updates - Fields to be updated
   * @param {string} [updates.name] - New name
   * @param {string} [updates.email] - New email
   * @param {string} [updates.passwordHash] - New hashed password
   * @param {Date} [updates.updatedAt] - New update date
   */
  update({ name, email, passwordHash, updatedAt }) {
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    if (passwordHash !== undefined) this.passwordHash = passwordHash;
    if (updatedAt !== undefined) this.updatedAt = updatedAt;
  }

  /**
   * Returns a JSON representation of the user
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
