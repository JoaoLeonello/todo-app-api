// src/modules/users/db/queries/userQueries.js

const knex = require('../../../../infrastructure/database/connection'); 

const userQueries = {
  async createUser({ name, email, password_hash }) {
    const [user] = await knex('users')
      .insert({
        name,
        email,
        password_hash: password_hash,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning(['id', 'name', 'email', 'created_at', 'updated_at']);
    return user;
  },

  async findByEmail(email) {
    return knex('users').where({ email }).first();
  },

  async findById(id) {
    return knex('users').where({ id }).first();
  },

  async updateUser(id, updates) {
    const [updatedUser] = await knex('users')
      .where({ id })
      .update({ ...updates, updated_at: knex.fn.now() })
      .returning(['id', 'name', 'email', 'updated_at']);
    return updatedUser;
  },

  async deleteUser(id) {
    return knex('users').where({ id }).del();
  },
};

module.exports = userQueries;
