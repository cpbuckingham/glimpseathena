'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const createAvatar = require('../public/js/octodex_avatar');

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

router.get('/dashboard',  function (req, res) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
           res.render('dashboard/dashboard', {
            user: user,
          })
        })
      })

router.get('/patients',authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    knex('patients').where('user_id', userID).then(function (patients){
           res.render('dashboard/patient', {
            user: user,
            patients, patients,
          })
        })
      })
    })

router.get('/user',authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
  res.render('dashboard/user', {
    user: user,
    })
  })
})

router.get('/submissions',authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    knex('surveys').where('user_id', userID).then(function (surveys){
      knex.from('surveys').innerJoin('submissions', 'surveys.id', 'submissions.user_id').innerJoin('patients','patients.id', 'patients.user_id').where('patients.user_id', userID).then(function (submissions){
  res.render('dashboard/submissions', {
    user: user,
    surveys:surveys,
    submissions: submissions,
      })
      console.log(submissions);
    })
  })
})
})


        router.get('/surveys',authorizedUser, function (req, res, next) {
          let userID = req.session.user.id;
          knex('users').where('id', userID).first().then(function (user){
            knex('patients').where('user_id', userID).then(function (patients){
              knex('surveys').where('user_id', userID).then(function (surveys){
                   res.render('dashboard/survey', {
                    user: user,
                    patients, patients,
                    surveys:surveys,
                  })
                })
                })
              })
            })




router.get('/signup', function (req, res, next) {
  res.render('auth/signup')
})

router.get('/login', function (req, res, next) {
  res.render('auth/login');
})

router.post('/signup', function (req, res, next) {
  knex('users').where({
    email: req.body.email
  }).first().then(function(user){
    if(!user){
      let hash = bcrypt.hashSync(req.body.hashed_password, 12);
      createAvatar.generateAvatar(function(created_avatar){
        return knex('users').insert({
          email: req.body.email,
          hashed_password: hash,
          avatar: created_avatar,
          username: req.body.username,
        }).then(function (){
          res.redirect('/auth/login');
        })
      });
    } else {
      res.redirect('/auth/signup');
    }
  })
})

router.post('/login', function (req, res, next) {
  knex('users').where({
    email: req.body.email
  }).first().then(function (user) {
    if(!user){
      res.render('partials/404')
    } else {
      bcrypt.compare(req.body.hashed_password, user.hashed_password, function(err, result) {
        if(result){
          req.session.user = user;
          res.cookie("loggedin", true);
          res.redirect('/auth/dashboard');
        } else {
          res.render('partials/403')
        }
      })
    }
  })
})

router.get('/logout', function (req, res) {
  req.session = null;
  res.clearCookie('loggedin');
  res.redirect('/');
})

module.exports = router
