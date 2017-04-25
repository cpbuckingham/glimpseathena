/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("employees", function (table) {
        table.increments();
        table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("CASCADE");
        table.string("full_name").defaultTo("");
        table.string("role").defaultTo("");
        table.string("hire_date").defaultTo("");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("employees");
};
