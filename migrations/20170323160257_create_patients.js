/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("patients", function (table) {
        table.increments();
        table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("CASCADE");
        table.string("email").unique();
        table.string("gender").unique();
        table.string("password").defaultTo("password123");
        table.string("full_name").defaultTo("");
        table.string("avatar");
        table.string("address").defaultTo("");
        table.string("city").defaultTo("");
        table.string("state").defaultTo("");
        table.string("postal_code").defaultTo("");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("patients");
};
