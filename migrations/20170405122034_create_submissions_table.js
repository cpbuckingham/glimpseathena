/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("submissions", function (table) {
        table.increments();
        table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("CASCADE");
        table.integer("patient_id").unsigned().index().references("id").inTable("patients").onDelete("CASCADE");
        table.integer("survey_id").unsigned().index().references("id").inTable("surveys").onDelete("CASCADE");
        table.string("answer_1").defaultTo("");
        table.string("answer_2").defaultTo("");
        table.string("answer_3").defaultTo("");
        table.string("answer_4").defaultTo("");
        table.string("answer_5").defaultTo("");
        table.boolean("read").defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("submissions");
};
