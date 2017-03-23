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
  let patientID = req.params.id;
  knex('patients').where('id', patientID).first().then(function (patient){
           res.render('patients/single', {
            patient: patient,
    })
  })
})

router.get('/:id/edit', authorizedUser, function (req, res, next) {
  let patientID = req.params.id;
  knex('patients').where('id', patientID).first().then(function (patient){
           res.render('patients/edit', {
            patient: patient,
    })
  })
})

router.delete('/:id', function (req, res, next) {
  let patientID = req.params.id;
  knex('patients').where('id', patientID).del().then(function (deleted) {
    res.redirect('/auth/patients')
  })
})

router.post('/', authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  createAvatar.generateAvatar(function(created_avatar){
  knex('patients').insert({
    email: req.body.email,
    full_name: req.body.full_name,
    avatar: created_avatar,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    postal_code: req.body.postal_code,
    user_id: knex.select('id').from('users').where('id', userID)
  }).then(function (){
    res.redirect('/auth/patients')
  })
});
})

module.exports = router
