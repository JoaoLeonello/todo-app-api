// server/modules/users/routes/organizationRoutes.js

const express = require('express');

function createOrganizationRoutes(organizationController) {
  const router = express.Router();

  router.post('/', (req, res) => organizationController.createOrganization(req, res));

  return router;
}

module.exports = createOrganizationRoutes;
