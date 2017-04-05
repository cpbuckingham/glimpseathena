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


module.exports = router
