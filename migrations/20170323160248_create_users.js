/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("users" ,function (table) {
        table.increments();
        table.boolean("admin").defaultTo(true);
        table.string("username").unique();
        table.string("email").unique();
        table.string("hashed_password");
        table.string("role").defaultTo("");
        table.string("last_name").defaultTo("");
        table.string("first_name").defaultTo("");
        table.string("bio").defaultTo("");
        table.string("avatar");
        table.string("company_name").defaultTo("");
        table.string("address").defaultTo("");
        table.string("city").defaultTo("");
        table.string("state").defaultTo("");
        table.string("postal_code").defaultTo("");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
