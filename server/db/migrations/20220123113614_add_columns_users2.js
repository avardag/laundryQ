exports.up = async function up(knex) {
  if (await knex.schema.hasTable("users")) {
    return knex.schema.alterTable("users", (table) => {
      table
        .enu("role", ["user", "moderator", "admin", "superuser"], {
          useNative: true,
          enumName: "roles_enum",
        })
        .defaultTo("user");
      table.string("city", 32).notNullable();
      table.text("address").notNullable();
      table.integer("laundry_id").references("id").inTable("laundries");
    });
  }
};

exports.down = async function down(knex) {
  if (await knex.schema.hasTable("users")) {
    return knex.schema.alterTable("users", (table) => {
      table.dropColumn("role");
      table.dropColumn("city");
      table.dropColumn("address");
      table.dropColumn("laundry_id");
    });
  }
};
