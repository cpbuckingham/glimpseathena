'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.render('404')
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

router.get('/', [authorizedUser, authorizedAdmin], function(req, res, next) {
  res.render('dashboard/dashboard')
})

router.delete('/:id', function (req, res, next) {
    let userID = req.session.user.id;
    knex('users').where('id', userID).del().then(function (deleted) {
    res.redirect('/')
  })
})

router.put('/:id', authorizedUser,function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).update({
    username: req.body.username,
    role: req.body.role,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar,
    bio: req.body.bio,
    company_name: req.body.company_name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
  }).then(function (){
    res.redirect('/auth/user')
  } )
})

module.exports = router
