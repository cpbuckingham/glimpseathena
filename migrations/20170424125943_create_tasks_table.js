/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("tasks", function (table) {
        table.increments();
        table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("CASCADE");
        table.integer("employee_id").unsigned().index().references("id").inTable("employees").onDelete("CASCADE");
        table.string("note").defaultTo("");
        table.boolean("completed").defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tasks");
};
