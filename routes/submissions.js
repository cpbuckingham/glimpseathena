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
  knex('users').where('id', userID).first().then(function (user){
           res.render('patients/new', {
            user: user,
    })
  })
})

router.get('/:id', authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    knex.from('surveys').innerJoin('submissions', 'surveys.id', 'submissions.user_id').innerJoin('patients','patients.id', 'patients.user_id').where('patients.user_id', userID).then(function (submissions){
           res.render('submissions/single', {
            user: user,
            submissions: submissions,
    })
  })
  })
  })


module.exports = router
