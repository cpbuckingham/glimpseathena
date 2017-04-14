exports.seed = function ( knex, Promise ) {
    return knex( "surveys" ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( "surveys" ).insert( {
                    id: 1,
                    user_id: 1,
                    type: "Office Entry Survey",
                    status_on: true,
                    title: "welcome to the office",
                    question_1: "What brings you to the office?",
                    question_2: "Are you in any pain (scale of 0-10)?",
                    question_3: "Are there any recent changes in your medical history",
                    question_4: "What medications are you taking?",
                    question_5: "Where did you get your prescription?",
                } ),
                knex( "surveys" ).insert( {
                    id: 2,
                    user_id: 1,
                    type: "Office Exit Survey",
                    status_on: true,
                    title: "Hope the office visit went well",
                    question_1: "Are you satisfied with your appointment?",
                    question_2: "What made your experience enjoyable today, not enjoyable?",
                    question_3: "What could have enhanced your experience today?",
                    question_4: "Will you return to this practice",
                    question_5: "Will you refer others to this practice",
                } ),
                knex( "surveys" ).insert( {
                    id: 3,
                    user_id: 1,
                    type: "Pharmacy Entry Survey",
                    status_on: true,
                    title: "welcome to the pharmacy",
                    question_1: "Is your visit related to your recent visit with Doctor Buckingham?",
                    question_2: "Will you be filling a prescription with a pharmacist today?",
                    question_3: "Is this your local pharmacy?",
                    question_4: "Do you always come here, is it your local pharmacy?",
                    question_5: "Are you picking up any other products too, if so, what kind?",
                } ),
                knex( "surveys" ).insert( {
                    id: 4,
                    user_id: 1,
                    type: "Pharmacy Exit Survey",
                    status_on: true,
                    title: "Hope the pharmacy visit went well",
                    question_1: "Did you purchase your prescription?",
                    question_2: "Did you choose brand or generic?",
                    question_3: "What was your mode of payment, cash or insurance?",
                    question_4: "Does you prescription require a refill?",
                    question_5: "Will you return to this pharmacy or a similar branch for your refill?",
                } )
            ] );
        } );
};
