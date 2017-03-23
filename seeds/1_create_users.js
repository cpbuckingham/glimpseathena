exports.seed = function ( knex, Promise ) {
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( 'users' ).insert( {
                    id: 1,
                    username: 'cpbuckingham',
                    email: 'cameron.p.buckingham@gmail.com',
                    admin: false,
                    first_name: 'Cam',
                    last_name: 'Buckingham',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/homercat.png',
                    role: "Engineer",
                    company_name: "Microsoft",
                    address: "281 Middle Crk",
                    city: "Buda",
                    country: "USA",
                    postal_code: "78610",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } ),
                knex( 'users' ).insert( {
                    id: 2,
                    username: 'lindszg',
                    email: 'lindszg@gmail.com',
                    admin: false,
                    first_name: 'Lindsey',
                    last_name: 'Buckingham',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/mcefeeline.jpg',
                    role: "Flight Attendant",
                    company_name: "American",
                    address: "281 Middle Crk",
                    city: "Buda",
                    country: "USA",
                    postal_code: "78610",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } ),
                knex( 'users' ).insert( {
                    id: 3,
                    username: 'tobig',
                    email: 'tobi@lsreg.com',
                    admin: false,
                    first_name: 'Tobi',
                    last_name: 'Guerrero',
                    hashed_password: '$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK',
                    avatar: 'https://octodex.github.com/images/dunetocat.png',
                    role: "Realtor",
                    company_name: "Lone Star Realty",
                    address: "312 Laurel Hill",
                    city: "San Marcos",
                    country: "USA",
                    postal_code: "78666",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } )
            ] );
        } );
      };