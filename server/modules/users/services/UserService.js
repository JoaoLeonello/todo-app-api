// services/UserService.js
const User = require('../domain/User');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use.');
    }

    const passwordHash = `hashed_${password}_${10}`;
    const userData = { name, email, password_hash: passwordHash };
    try {
      const createdUser = await this.userRepository.create(userData);
      console.log('User successfully created:', createdUser);
      return new User(createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

}

module.exports = UserService;
