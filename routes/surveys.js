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

router.get('/', function (req, res, next) {
  res.render('surveys/new')
})

module.exports = router
