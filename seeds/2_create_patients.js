exports.seed = function ( knex, Promise ) {
    return knex( "patients" ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( "patients" ).insert( {
                    user_id: 1,
                    email: "kenzi@gmail.com",
                    gender: "female",
                    full_name: "Kenzi Garcia",
                    avatar: "https://octodex.github.com/images/octoliberty.png",
                    address: "281 Middle Crk",
                    city: "Buda",
                    state: "TX",
                    postal_code: "78610",
                } ),
                knex( "patients" ).insert( {
                    user_id: 1,
                    email: "taryn@gmail.com",
                    gender: "female",
                    full_name: "Taryn Davis",
                    avatar: "https://octodex.github.com/images/femalecodertocat.png",
                    address: "181 Harlen Creek",
                    city: "Buda",
                    state: "TX",
                    postal_code: "78612",
                } ),
                knex( "patients" ).insert( {
                    user_id: 1,
                    email: "sammi@gmail.com",
                    gender: "female",
                    full_name: "Sammi Guerrero",
                    avatar: "https://octodex.github.com/images/daftpunktocat-thomas.gif",
                    address: "77 Chicon Rd",
                    city: "San Marcos",
                    state: "TX",
                    postal_code: "78664",
                } ),
                knex( "patients" ).insert( {
                    user_id: 2,
                    email: "roland@gmail.com",
                    gender: "male",
                    full_name: "Roland Guerrero",
                    avatar: "https://octodex.github.com/images/foundingfather_v2.png",
                    address: "312 Heartfelt Rd",
                    city: "San Marcos",
                    state: "TX",
                    postal_code: "78666",
                } ),
                knex( "patients" ).insert( {
                    user_id: 3,
                    email: "markmelody1978@gmail.com",
                    gender: "male",
                    full_name: "Mark Buckingham",
                    avatar: "https://octodex.github.com/images/daftpunktocat-guy.gif",
                    address: "17 Woonsockett Ct",
                    city: "Silver Spring",
                    state: "MD",
                    postal_code: "20905",
                } )
            ] );
        } );
};
