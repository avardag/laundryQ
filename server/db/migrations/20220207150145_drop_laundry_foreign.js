exports.up = function (knex) {
  return knex.schema.alterTable("laundries", (table) => {
    table.dropForeign("admin_id");

    table.foreign("admin_id").references("users.id").onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("laundries", (table) => {
    table.dropForeign("admin_id");

    table.foreign("admin_id").references("users.id").onDelete("NO ACTION");
  });
};
