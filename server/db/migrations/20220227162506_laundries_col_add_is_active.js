exports.up = async function up(knex) {
  if (await knex.schema.hasTable("laundries")) {
    return knex.schema.alterTable("laundries", (table) => {
      table.boolean("is_active").defaultTo(false);
    });
  }
};

exports.down = async function down(knex) {
  if (await knex.schema.hasTable("laundries")) {
    return knex.schema.alterTable("laundries", (table) => {
      table.dropColumn("is_active");
    });
  }
};
