exports.up = function (knex) {
  return knex.schema.alterTable("bookings", (table) => {
    table.dropForeign("user_id");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("bookings", (table) => {
    table.dropForeign("user_id");

    table.foreign("user_id").references("users.id").onDelete("NO ACTION");
  });
};
