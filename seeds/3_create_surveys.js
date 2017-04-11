exports.seed = function ( knex, Promise ) {
    return knex( 'surveys' ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( 'surveys' ).insert( {
                    id: 1,
                    user_id: 1,
                    type: "Office Entry Survey",
                    status_on: true,
                    title: "welcome to the office",
                    question_1: 'How are you feeling today?',
                    question_2: 'Did you fulfill your last prescription?',
                    question_3: 'Have you been following the instructions for your prescription?',
                    question_4: 'Have you felt any discomfort from using your prescription?',
                    question_5: 'Where did you get your prescription?',
                } ),
                knex( 'surveys' ).insert( {
                    id: 2,
                    user_id: 1,
                    type: "Office Exit Survey",
                    status_on: true,
                    title: "Hope the office visit went well",
                    question_1: 'How did your appointment go?',
                    question_2: 'Did you feel comfident with your prognosis?',
                    question_3: 'Did you get another prescription?',
                    question_4: 'How old are you?',
                    question_5: 'Do you feel supported?',
                } ),
                knex( 'surveys' ).insert( {
                    id: 3,
                    user_id: 1,
                    type: "Pharmacy Entry Survey",
                    status_on: true,
                    title: "welcome to the pharmacy",
                    question_1: 'Are you picking up your prescriptions now?',
                    question_2: 'Is this the first pharmacy you have visited to pick up?',
                    question_3: 'Is this your local pharmacy?',
                    question_4: 'Do you always come here?',
                    question_5: 'Are you picking up any groceries too?',
                } ),
                knex( 'surveys' ).insert( {
                    id: 4,
                    user_id: 1,
                    type: "Pharmacy Exit Survey",
                    status_on: true,
                    title: "Hope the pharmacy visit went well",
                    question_1: 'Did you get the drugs?',
                    question_2: 'What color are they?',
                    question_3: 'Are they shinny?',
                    question_4: 'Did you take the pills already?',
                    question_5: 'Did you take the green pill or the red pill?',
                } )
            ] );
        } );
      };
