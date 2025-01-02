exports.up = async function (knex) {
    // 1) Users
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique();
      table.string('password_hash');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
    // 2) Organizations
    await knex.schema.createTable('organizations', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
    // 3) Projects
    await knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.string('name');
      // FK para organizations
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE') // ou RESTRICT, se preferir
        .onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
    // 4) Tasks
    // status: ENUM('todo', 'in_progress', 'done')
    // - Se quiser de fato um enum real no Postgres, use .enu().
    //   Caso prefira apenas uma string, use table.string('status').
    await knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.text('description');
      table
        .enu('status', ['todo', 'in_progress', 'done'], {
          useNative: true,
          enumName: 'task_status_enum' // nome do tipo enum no Postgres
        })
        .notNullable()
        .defaultTo('todo');
      // FK para projects
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // FK para users (assigned_user_id) - pode ser nulo
      table
        .integer('assigned_user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.date('due_date');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
    // 5) task_comments
    await knex.schema.createTable('task_comments', (table) => {
      table.increments('id').primary();
      // FK para tasks
      table
        .integer('task_id')
        .unsigned()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      // FK para users
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('comment');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  
    // 6) user_organization (tabela pivot com role)
    // - Pode ter PK composta (user_id + organization_id).
    // - role: ENUM('admin', 'member').
    await knex.schema.createTable('user_organization', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .enu('role', ['admin', 'member'], {
          useNative: true,
          enumName: 'user_org_role_enum'
        })
        .notNullable()
        .defaultTo('member');
      table.timestamp('created_at').defaultTo(knex.fn.now());
  
      // Define a primary key composta
      table.primary(['user_id', 'organization_id']);
    });
  };
  
  exports.down = async function (knex) {
    // A ordem inversa importa por conta das FKs
    await knex.schema.dropTableIfExists('user_organization');
    await knex.schema.dropTableIfExists('task_comments');
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('projects');
    await knex.schema.dropTableIfExists('organizations');
    await knex.schema.dropTableIfExists('users');
  
    // Se você estiver usando enums nativos do Postgres, eles ficam
    // registrados no banco. Se quiser limpar, pode precisar dropar
    // manualmente, ex: `await knex.schema.raw('DROP TYPE IF EXISTS task_status_enum')`
    // e `await knex.schema.raw('DROP TYPE IF EXISTS user_org_role_enum')`.
  };
  