exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.boolean("is_activated").defaultTo(false);
    table.string("activation_link");
  });
};
exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("is_activated");
    table.dropColumn("activation_link");
  });
};
