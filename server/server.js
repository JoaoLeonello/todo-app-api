const app = require('./infrastructure/frameworks/express/server-config.js');
const routes = require('./infrastructure/frameworks/express/routes/server-routes.js');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

const port = process.env.PORT || 3000;

app.use(routes)

// Run migrations and start the server
if (process.env.NODE_ENV !== 'test') {
  knex.migrate
    .latest()
    .then(() => {
      console.log('Migrations successfully run.');
      app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch((err) => {
      console.error('Error running migrations:', err);
      process.exit(1); 
    });
}

module.exports = app;