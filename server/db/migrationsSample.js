exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments().primary();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.boolean("account_verified").notNullable().defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("posts", function (table) {
      table.increments().primary();
      table.string("title", 255).notNullable();
      table.string("body", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("user_id").references("id").inTable("users");
    })
    .createTable("comments", function (table) {
      table.increments().primary();
      table.string("comment", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("user_id").references("id").inTable("users");
      table.string("user_name", 255).notNullable();
      table.integer("post_id").references("id").inTable("posts");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("posts")
    .dropTable("users")
    .dropTable("comments");
};
/////////////////////////////////////////////////////////////////
//Adding/Dropping Columns
exports.up = function (knex, Promise) {
  knex.schema.table("users", function (table) {
    table.integer("fullname").notNull();
  });
};

exports.down = function (knex, Promise) {
  knex.schema.table("users", function (table) {
    table.dropColumn("fullname");
  });
};
//or rename a column
////////////////////////////

exports.up = async function up(knex) {
  if (await knex.schema.hasTable("teachers")) {
    await knex.schema.alterTable("teachers", (table) => {
      table.renameColumn("name", "teacher_name");
      table.decimal("level", 3).alter();
    });
  }
};

exports.down = async function down(knex) {
  if (await knex.schema.hasTable("teachers")) {
    await knex.schema.alterTable("teachers", (table) => {
      table.renameColumn("teacher_name", "name");
      table.string("level").alter();
    });
  }
};

//or
////////////////////////////////////////
// .table() or .alterTable()  //same

exports.up = function (knex) {
  return knex.schema.alterTable("account", (table) => {
    table.timestamp("date_deleted");
  });
};
exports.down = function (knex) {
  return knex.schema.alterTable("account", (table) => {
    table.dropColumn("date_deleted");
  });
};
