exports.up = async function up(knex) {
  if (await knex.schema.hasTable("users")) {
    return knex.schema.alterTable("users", (table) => {
      table.string("postcode", 6).notNullable();
    });
  }
};

exports.down = async function down(knex) {
  if (await knex.schema.hasTable("users")) {
    return knex.schema.alterTable("users", (table) => {
      table.dropColumn("postcode");
    });
  }
};
