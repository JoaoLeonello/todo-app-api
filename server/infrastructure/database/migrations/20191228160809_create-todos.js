exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password_hash", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });

  // 2) Organizations
  await knex.schema.createTable("organizations", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // 3) Projects
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("name");
    // FK para organizations
    table
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // 4) Tasks
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.text("description");
    table
      .enu("status", ["todo", "in_progress", "done"], {
        useNative: true,
        enumName: "task_status_enum",
      })
      .notNullable()
      .defaultTo("todo");
    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("assigned_user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.date("due_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // 5) task_comments
  await knex.schema.createTable("task_comments", (table) => {
    table.increments("id").primary();
    table
      .integer("task_id")
      .unsigned()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("comment");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // 6) user_organization
  await knex.schema.createTable("user_organization", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .enu("role", ["admin", "member"], {
        useNative: true,
        enumName: "user_org_role_enum",
      })
      .notNullable()
      .defaultTo("member");
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.primary(["user_id", "organization_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_organization");
  await knex.schema.dropTableIfExists("task_comments");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("projects");
  await knex.schema.dropTableIfExists("organizations");
  await knex.schema.dropTableIfExists("users");
};
