exports.seed = function ( knex, Promise ) {
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( 'users' ).insert( {
                    id: 1,
                    admin: true,
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/homercat.png',
                    email: 'cam@gmail.com',
                } ),
                knex( 'users' ).insert( {
                    id: 2,
                    admin: false,
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/octocat-de-los-muertos.jpg',
                    email: 'jam@gmail.com',
                } ),
                knex( 'users' ).insert( {
                    id: 3,
                    admin: false,
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/filmtocat.png',
                    email: 'bam@gmail.com',
                } )
            ] );
        } );
      };
