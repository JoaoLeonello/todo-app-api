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

// Factory function
const createOrganizationRoutes = require('../../../../modules/organizations/routes/organizationRoutes');

// Organization dependencies
const OrganizationRepository = require('../../../../modules/organizations/repositories/OrganizationRepository');
const OrganizationService = require('../../../../modules/organizations/services/OrganizationService');
const OrganizationController = require('../../../../modules/organizations/controllers/OrganizationController');

const organizationRepository = new OrganizationRepository();
const organizaitonService = new OrganizationService(organizationRepository, userRepository);
const organizationController = new OrganizationController(organizaitonService);


const userRoutes = createUserRoutes(userController);
const organizationRoutes = createOrganizationRoutes(organizationController)

// Montar as rotas de usuários no path '/users'
router.use('/users', userRoutes);
router.use('/organizations', organizationRoutes);

// Exportar o router principal
module.exports = router;
