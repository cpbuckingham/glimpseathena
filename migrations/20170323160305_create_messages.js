exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('messages', function (table) {
      table.increments();
      table.string('note').notNullable().defaultTo("");
      table.integer('sender_id').notNullable();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('messages');
};
