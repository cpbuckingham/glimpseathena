exports.seed = function ( knex, Promise ) {
    return knex( "employees" ).del()
        .then( function () {
            return Promise.all( [
                knex( "employees" ).insert( {
                    id:1,
                    user_id: 1,
                    full_name: "Mark",
                    role: "Healthcare Professional",
                    hire_date: "July 28, 2012",
                } ),
                knex( "employees" ).insert( {
                    id:2,
                    user_id: 1,
                    full_name: "Melody",
                    role: "Office Coordinator",
                    hire_date: "August 27, 2017",
                } ),
                knex( "employees" ).insert( {
                    id:3,
                    user_id: 1,
                    full_name: "Jenna",
                    role: "Healthcare Professional",
                    hire_date: "October 22, 2011",
                } )
            ] );
        } );
};
