exports.up = function (knex) {
  return knex.schema
    .createTable("laundries", function (table) {
      table.increments().primary();
      table.string("name", 255).notNullable();
      table.text("address").notNullable();
      table.string("phone", 12);
      table.string("city", 32).notNullable();
      table.string("postcode", 6).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("admin_id").references("id").inTable("users");
    })
    .createTable("machines", function (table) {
      table.increments().primary();
      table.integer("size").notNullable();
      table.integer("number").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("laundry_id").references("id").inTable("laundries");
    })
    .createTable("bookings", function (table) {
      table.increments().primary();
      table.timestamp("datetime_from").notNullable();
      table.timestamp("datetime_till").notNullable();
      table.integer("pin").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("machine_id").references("id").inTable("machines");
      table.integer("user_id").references("id").inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("laundries")
    .dropTable("machines")
    .dropTable("bookings");
};
