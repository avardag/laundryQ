exports.up = function (knex) {
  return knex.schema.alterTable("machines", (table) => {
    table.dropForeign("laundry_id");

    table.foreign("laundry_id").references("laundries.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("machines", (table) => {
    table.dropForeign("laundry_id");

    table
      .foreign("laundry_id")
      .references("laundries.id")
      .onDelete("NO ACTION");
  });
};
