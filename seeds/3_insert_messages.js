exports.seed = function ( knex, Promise ) {
    return knex( 'messages' ).del()
        .then( function () {
            return Promise.all( [
                knex( 'messages' ).insert( {
                    note: "a message from bam(3) to bam(2)",
                    sender_id: 3,
                    user_id: 2
                } ),
                knex( 'messages' ).insert( {
                    note: "a message from jam(2) to cam(1)",
                    sender_id: 2,
                    user_id: 1
                } ),
                knex( 'messages' ).insert( {
                    note: "another message from jam(2) to cam(1)",
                    sender_id: 2,
                    user_id: 1
                } ),
                knex( 'messages' ).insert( {
                    note: "a message from cam(1) to bam(3)",
                    sender_id: 1,
                    user_id: 3
                } )
            ] );
        } );
      };
