const app = require('./server-config.js');
const routes = require('./server-routes.js');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

const port = process.env.PORT || 5000;

app.get('/', routes.getAllTodos);
app.get('/:id', routes.getTodo);

app.post('/', routes.postTodo);
app.patch('/:id', routes.patchTodo);

app.delete('/', routes.deleteAllTodos);
app.delete('/:id', routes.deleteTodo);

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