// routes.js

const express = require('express');
const router = express.Router();

// Factory function
const createUserRoutes = require('../../../../modules/users/routes/userRoutes');

// Users dependencies
const UserRepository = require('../../../../modules/users/repositories/UserRepository');
const UserService = require('../../../../modules/users/services/UserService');
const UserController = require('../../../../modules/users/controllers/UserController');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = createUserRoutes(userController);

// Montar as rotas de usuários no path '/users'
router.use('/users', userRoutes);

// Exportar o router principal
module.exports = router;
