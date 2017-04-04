exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('surveys', function (table) {
      table.increments();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
      table.string('title').defaultTo("");
      table.string('type').defaultTo("");
      table.string('question_1').defaultTo("");
      table.string('question_2').defaultTo("");
      table.string('question_3').defaultTo("");
      table.string('question_4').defaultTo("");
      table.string('question_5').defaultTo("");
      table.boolean('submitted').defaultTo(false);
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('patients');
};
