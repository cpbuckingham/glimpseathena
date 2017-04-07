'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const createAvatar = require('../public/js/octodex_avatar');

function authorizedUser(req, res, next) {
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('admin/restricted')
  }
}

router.get('/new', authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex.from('submissions').where({read: false, user_id: userID}).then(function (unread) {
  knex('users').where('id', userID).first().then(function (user){
           res.render('patients/new', {
            user: user,
            unread: unread,
    })
    })
  })
})

router.get('/:id', authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  let submissionID = req.params.id;
  knex.from('submissions').where({read: false, user_id: userID}).then(function (unread) {
  knex('users').where('id', userID).first().then(function (user){
    knex.from('submissions').innerJoin('patients', 'submissions.patient_id', 'patients.id').innerJoin('surveys', 'submissions.survey_id', 'surveys.id').first().where('submissions.id', submissionID).then(function (submission){
           res.render('submissions/single', {
            user: user,
            submission: submission,
            unread: unread,
    })
    console.log(submission);
  })
  })
  })
  })

  router.delete('/:id', function (req, res, next) {
    let submissionID = req.params.id;
    knex('submissions').where('id', submissionID).del().then(function (deleted) {
      res.redirect('/auth/submissions')
    })
  })

  router.put('/:id', function(req, res, next) {
  let submissionID = req.params.id;
  knex('submissions').where('id', submissionID).update({
    read: true,
  }).then(function (){
    res.redirect('/auth/submissions')
  })
})


module.exports = router
