'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}

function authorizedAdmin(req, res, next) {
  let userID = req.session.user.admin === true;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}

router.get('/new', authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    res.render('surveys/new', {
      userID: userID,
      user: user,
    })
  })
})

router.get('/:id', authorizedUser, function (req, res, next) {
  let surveyID = req.params.id;
  knex('surveys').where('id', surveyID).first().then(function (survey){
           res.render('surveys/edit', {
            survey: survey,
    })
  })
})

router.delete('/:id', function (req, res, next) {
  let surveyID = req.params.id;
  knex('surveys').where('id', surveyID).del().then(function (deleted) {
    res.redirect('/auth/surveys')
  })
})


router.post('/', authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex('surveys').insert({
    user_id: userID,
    question_1: req.body.question_1,
    question_2: req.body.question_2,
    question_3: req.body.question_3,
    question_4: req.body.question_4,
    question_5: req.body.question_5,
  }).then(function (){
    res.redirect('/auth/surveys')
  })
})

router.put('/:id' ,function (req, res, next) {
  let surveyID = req.params.id;
  knex('surveys').where('id', surveyID).update({
    // email: req.body.email,
    // full_name: req.body.full_name,
    // address: req.body.address,
    // city: req.body.city,
    // state: req.body.state,
    // postal_code: req.body.postal_code,
  }).then(function (){
    res.redirect('/auth/surveys')
  } )
})


module.exports = router
