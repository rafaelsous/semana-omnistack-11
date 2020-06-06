exports.up = function (knex) {
  return knex.schema
    .createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('name', 80).notNullable();
      table.string('email', 80).notNullable();
      table.string('whatsapp', 25).notNullable();
      table.string('city', 30).notNullable();
      table.string('uf', 2).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("ongs");
};
