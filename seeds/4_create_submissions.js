exports.seed = function ( knex, Promise ) {
    return knex( 'submissions' ).del()
        .then( function () {
            return Promise.all( [
                knex( 'submissions' ).insert( {
                    id: 1,
                    user_id: 1,
                    patient_id: 1,
                    survey_id: 1,
                    answer_1: 'Horrible',
                    answer_2: 'Yes, I still feel bad',
                    answer_3: 'Yes, but not really as best as I could',
                    answer_4: 'Yes, vomitting',
                    answer_5: 'CVS - Buda',
                } )
            ] );
        } );
      };
