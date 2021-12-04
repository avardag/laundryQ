exports.up = function (knex) {
  return knex.schema.createTable("tokens", function (table) {
    table.increments().primary();
    table.text("refresh_token").notNullable();
    table.timestamps(true, true);
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokens");
};
