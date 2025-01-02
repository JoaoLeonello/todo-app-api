// server/modules/users/routes/userRoutes.js

const express = require('express');

function createUserRoutes(userController) {
  const router = express.Router();

  router.post('/register', (req, res) => userController.register(req, res));
//   router.post('/login', (req, res) => userController.login(req, res));

  return router;
}

module.exports = createUserRoutes;
