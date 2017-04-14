exports.seed = function ( knex, Promise ) {
    return knex( "users" ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( "users" ).insert( {
                    username: "cpbuckingham",
                    email: "cameron.p.buckingham@gmail.com",
                    admin: true,
                    first_name: "Cam",
                    last_name: "Buckingham",
                    hashed_password: "$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK",
                    avatar: "https://octodex.github.com/images/homercat.png",
                    role: "Doctor",
                    company_name: "Microsoft",
                    address: "281 Middle Crk",
                    city: "Buda",
                    state: "TX",
                    postal_code: "78610",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } ),
                knex( "users" ).insert( {
                    username: "lindszg",
                    email: "lindszg@gmail.com",
                    admin: true,
                    first_name: "Lindsey",
                    last_name: "Jammer",
                    hashed_password: "$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK",
                    avatar: "https://octodex.github.com/images/mcefeeline.jpg",
                    role: "Flight Attendant",
                    company_name: "American",
                    address: "281 Middle Crk",
                    city: "Buda",
                    state: "TX",
                    postal_code: "78610",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } ),
                knex( "users" ).insert( {
                    username: "tobig",
                    email: "tobi@lsreg.com",
                    admin: true,
                    first_name: "Tobi",
                    last_name: "Guerrero",
                    hashed_password: "$2a$12$2fPhX9qJCLlVi0uXxttKPOhdHlC1x0THSLz5A1sjxVoZ5l6/C01ZK",
                    avatar: "https://octodex.github.com/images/dunetocat.png",
                    role: "Realtor",
                    company_name: "Lone Star Realty",
                    address: "312 Laurel Hill",
                    city: "San Marcos",
                    state: "TX",
                    postal_code: "78666",
                    bio: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                } )
            ] );
        } );
};
