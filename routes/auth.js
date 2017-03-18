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

router.get('/', authorizedUser,  function (req, res) {
  let userID = req.session.user.id;
  knex.from('users').innerJoin('messages', 'users.id', 'messages.sender_id').where('messages.user_id', userID).then(function (messages) {
  knex.from('messages').where({read: false, user_id: userID}).then(function (unread) {
  knex('users').where('id', userID).first().then(function (user){
    knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then(function(posts) {
      knex('posts').where('user_id', userID).then(function (my_posts){
        knex('comments').where('user_id', userID).then(function (comments){
         knex('users').where('id', 'in', knex.select('buddy_id').from('buddies').where('user_id', userID)).then(function (buddies){
          res.render('users/auth', {
            user: user,
            posts: posts,
            my_posts: my_posts,
            comments: comments,
            buddies: buddies,
            messages: messages,
            unread: unread,
                })
              })
            })
          })
        })
      })
    })
  })
})

router.get('/signup', function (req, res, next) {
  res.render('users/signup')
})

router.get('/login', function (req, res, next) {
  res.render('users/login');
})

router.post('/signup', function (req, res, next) {
  knex('users').where({
    username: req.body.username
  }).first().then(function(user){
    if(!user){
      let hash = bcrypt.hashSync(req.body.hashed_password, 12);
      createAvatar.generateAvatar(function(created_avatar){
        return knex('users').insert({
          username: req.body.username,
          hashed_password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          admin: req.body.admin,
          avatar: created_avatar,
        }, "*").then(function (users) {
          return knex('buddies').insert({
            buddy_id: 1,
            user_id: users[0].id,
          })
        }).then(function (){
          res.redirect('/auth/login');
        })
      });
    } else {
      res.redirect('/users');
    }
  })
})

router.post('/login', function (req, res, next) {
  knex('users').where({
    username: req.body.username
  }).first().then(function (user) {
    if(!user){
      res.send('no username')
    } else {
      bcrypt.compare(req.body.hashed_password, user.hashed_password, function(err, result) {
        if(result){
          req.session.user = user;
          res.cookie("loggedin", true);
          res.redirect('/auth');
        } else {
          res.redirect('/auth/login')
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
