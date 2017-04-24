exports.seed = function ( knex, Promise ) {
    return knex( "employees" ).del()
        .then( function () {
            return Promise.all( [
                knex( "employees" ).insert( {
                    id:1,
                    user_id: 1,
                    full_name: "Mark Buckingham",
                    role: "Office Manager",
                    hire_date: "July 28, 1954",
                } ),
                knex( "employees" ).insert( {
                    id:2,
                    user_id: 1,
                    full_name: "Melody Buckingham",
                    role: "Office Director",
                    hire_date: "August 27, 1954",
                } ),
                knex( "employees" ).insert( {
                    id:3,
                    user_id: 2,
                    full_name: "Jenna Buckingham",
                    role: "Office Coordinator",
                    hire_date: "October 22, 1975",
                } )
            ] );
        } );
};
