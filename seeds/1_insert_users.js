exports.seed = function ( knex, Promise ) {
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( 'users' ).insert( {
                    id: 1,
                    username: 'cam',
                    admin: true,
                    first_name: 'cam',
                    last_name: 'buckingham',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/homercat.png',
                    email: 'cam@gmail.com',
                    goal1: "I want to be able to do 40 pull-ups in a minute",
                    goal2: "I want to sleep for more than 8 hours a night",
                    goal3: "Lose 10 lbs over the next 6 months"
                } ),
                knex( 'users' ).insert( {
                    id: 2,
                    username: 'jam',
                    admin: false,
                    first_name: 'jam',
                    last_name: 'buckingham',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/octocat-de-los-muertos.jpg',
                    email: 'jam@gmail.com',
                    goal1: "I want to be able to do 40 pull-ups in a minute",
                    goal2: "I want to sleep for more than 8 hours a night",
                    goal3: "Lose 10 lbs over the next 6 months"
                } ),
                knex( 'users' ).insert( {
                    id: 3,
                    username: 'bam',
                    admin: false,
                    first_name: 'bam',
                    last_name: 'bam',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/filmtocat.png',
                    email: 'bam@gmail.com',
                    goal1: "I want to be able to do 40 pull-ups in a minute",
                    goal2: "I want to sleep for more than 8 hours a night",
                    goal3: "Lose 10 lbs over the next 6 months"
                } )
            ] );
        } );
      };
