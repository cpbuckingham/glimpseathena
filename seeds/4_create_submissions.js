exports.seed = function ( knex, Promise ) {
    return knex( "submissions" ).del()
        .then( function () {
            return Promise.all( [
                knex( "submissions" ).insert( {
                    id:1,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 1,
                    answer_1: "I have an appointment",
                    answer_2: "2 - low",
                    answer_3: "I have a rash on my left shoulder",
                    answer_4: "none, but I need some cream",
                    answer_5: "I dont have any yet",
                    read: false,
                } ),
                knex( "submissions" ).insert( {
                    id:2,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 2,
                    answer_1: "kind of, the doctor forgot to give me the sample medication, everything was moving too fast. I got my prescription though",
                    answer_2: "Service was great, but front desk manager seems rushed and stressed",
                    answer_3: "Slow down a bit and dont have the TV volume set so loud in the waiting room",
                    answer_4: "maybe, there is a place closer to my house",
                    answer_5: "maybe",
                    read: false,
                } ),
                knex( "submissions" ).insert( {
                    id:3,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 3,
                    answer_1: "yes",
                    answer_2: "yes",
                    answer_3: "CVS",
                    answer_4: "yes",
                    answer_5: "yes, batteries, milk, and a birthday card",
                    read: false,
                } ),
                knex( "submissions" ).insert( {
                    id:4,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 4,
                    answer_1: "yes",
                    answer_2: "generic",
                    answer_3: "insurance covered most, but I had a copay",
                    answer_4: "no",
                    answer_5: "yes",
                    read: false,
                } )
            ] );
        } );
};
