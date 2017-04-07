exports.seed = function ( knex, Promise ) {
    return knex( 'submissions' ).del()
        .then( function () {
            return Promise.all( [
                knex( 'submissions' ).insert( {
                    id:1,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 1,
                    answer_1: 'survey1',
                    answer_2: 'survey1',
                    answer_3: 'survey1',
                    answer_4: 'survey1',
                    answer_5: 'survey1',
                    read: false,
                } ),
                knex( 'submissions' ).insert( {
                    id:2,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 2,
                    answer_1: 'survey2',
                    answer_2: 'survey2',
                    answer_3: 'survey2',
                    answer_4: 'survey2',
                    answer_5: 'survey2',
                    read: false,
                } )
            ] );
        } );
      };
