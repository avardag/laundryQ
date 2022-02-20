exports.up = async function up(knex) {
  await knex.schema.dropTableIfExists("bookings");
  return knex.schema.createTable("bookings", function (table) {
    table.increments().primary();
    table.timestamp("datetime_from", { useTz: false }).notNullable();
    table.timestamp("datetime_till", { useTz: false }).notNullable();
    table.string("pin", 6).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("machine_id").references("id").inTable("machines");
    table.integer("user_id").references("id").inTable("users");
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("bookings");
  return knex.schema.createTable("bookings", function (table) {
    table.increments().primary();
    table.timestamp("datetime_from").notNullable();
    table.timestamp("datetime_till").notNullable();
    table.integer("pin").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("machine_id").references("id").inTable("machines");
    table.integer("user_id").references("id").inTable("users");
  });
};
