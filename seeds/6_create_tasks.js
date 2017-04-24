exports.seed = function ( knex, Promise ) {
    return knex( "tasks" ).del()
        .then( function () {
            return Promise.all( [
                knex( "tasks" ).insert( {
                    id:1,
                    user_id: 1,
                    employee_id:1,
                    note: "Clean up all the messes",
                    completed: false,
                } ),
                knex( "tasks" ).insert( {
                    id:2,
                    user_id: 1,
                    employee_id:2,
                    note: "Make everything work",
                    completed: true,
                } ),
                knex( "tasks" ).insert( {
                    id:3,
                    user_id: 2,
                    employee_id:3,
                    note: "Be creative",
                    completed: false,
                } )
            ] );
        } );
};
