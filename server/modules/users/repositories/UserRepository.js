// src/modules/users/repositories/userRepository.js

const userQueries = require('../db/queries/userQueries');
const User = require('../domain/User'); // User domain entity

class UserRepository {
  /**
   * Creates a new user in the database.
   * @param {Object} userData - User data
   * @param {string} userData.name - User's name
   * @param {string} userData.email - User's email
   * @param {string} userData.password_hash - Hashed password of the user
   * @returns {User} - The created User domain entity
   */
  async create(userData) {
    const userRecord = await userQueries.createUser(userData);
    return new User(userRecord); // Returns a domain entity instance
  }

  /**
   * Finds a user by their email.
   * @param {string} email - User's email
   * @returns {User|null} - User domain entity or null if not found
   */
  async findByEmail(email) {
    const userRecord = await userQueries.findByEmail(email);
    return userRecord ? new User(userRecord) : null;
  }

  /**
   * Finds a user by their ID.
   * @param {number} id - User's ID
   * @returns {User|null} - User domain entity or null if not found
   */
  async findById(id) {
    const userRecord = await userQueries.findById(id);
    return userRecord ? new User(userRecord) : null;
  }

  /**
   * Updates a user's data.
   * @param {number} id - User's ID
   * @param {Object} updates - Data to update
   * @returns {User|null} - Updated User domain entity or null if not found
   */
  async update(id, updates) {
    const updatedUserRecord = await userQueries.updateUser(id, updates);
    return updatedUserRecord ? new User(updatedUserRecord) : null;
  }

  /**
   * Deletes a user from the database.
   * @param {number} id - User's ID
   * @returns {boolean} - True if the user was deleted, false otherwise
   */
  async delete(id) {
    const rowsDeleted = await userQueries.deleteUser(id);
    return rowsDeleted > 0;
  }
}

module.exports = UserRepository;
