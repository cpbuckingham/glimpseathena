exports.seed = function ( knex, Promise ) {
    return knex( 'surveys' ).del()
        .then( function () {
            return Promise.all( [
              //password = test
                knex( 'surveys' ).insert( {
                    user_id: 1,
                    type: "Office Entry Survey",
                    title: "welcome to the office",
                    question_1: 'How are you feeling today?',
                    question_2: 'Did you fulfill your last prescription?',
                    question_3: 'Have you been following the instructions for your prescription?',
                    question_4: 'Have you felt any discomfort from using your prescription?',
                    question_5: 'Where did you get your prescription?',
                } ),
                knex( 'surveys' ).insert( {
                    user_id: 1,
                    type: "Office Exit Survey",
                    title: "goodbye have a great day",
                    question_1: 'How did your appointment go?',
                    question_2: 'Did you feel comfident with your prognosis?',
                    question_3: 'Did you get another prescription?',
                    question_4: 'How old are you?',
                    question_5: 'Do you feel supported?',
                } )
            ] );
        } );
      };
