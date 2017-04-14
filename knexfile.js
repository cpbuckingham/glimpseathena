/*eslint no-undef: 0*/

module.exports = {

    development: {
        client: "pg",
        connection: {
            database: "glimpseathena-dev",
            host: "localhost"
        }
    },

    test: {
        client: "pg",
        connection: {
            database: "glimpseathena-test",
            host: "localhost",
        }
    },

    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
    }
};
