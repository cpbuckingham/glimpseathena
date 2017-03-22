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
router.get('/icons',authorizedUser, function (req, res, next) {
  res.render('auth/icons')
})
router.get('/maps',authorizedUser, function (req, res, next) {
  res.render('auth/maps')
})
router.get('/notifications',authorizedUser, function (req, res, next) {
  res.render('auth/notifications')
})
router.get('/table',authorizedUser, function (req, res, next) {
  res.render('auth/table')
})
router.get('/typography',authorizedUser, function (req, res, next) {
  res.render('auth/typography')
})
router.get('/user',authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
  res.render('auth/user', {
    user: user,
  })
})
})
router.get('/template',authorizedUser, function (req, res, next) {
  res.render('auth/template')
})
router.get('/upgrade',authorizedUser, function (req, res, next) {
  res.render('auth/upgrade')
})
router.get('/',  function (req, res) {
  let userID = req.session.user.id;
//   knex.from('users').innerJoin('messages', 'users.id', 'messages.sender_id').where('messages.user_id', userID).then(function (messages) {
//   knex.from('messages').where({read: false, user_id: userID}).then(function (unread) {
  knex('users').where('id', userID).first().then(function (user){
//     knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then(function(posts) {
//       knex('posts').where('user_id', userID).then(function (my_posts){
//         knex('comments').where('user_id', userID).then(function (comments){
//          knex('users').where('id', 'in', knex.select('buddy_id').from('buddies').where('user_id', userID)).then(function (buddies){
           res.render('auth/auth', {
            user: user,
//             posts: posts,
//             my_posts: my_posts,
//             comments: comments,
//             buddies: buddies,
//             messages: messages,
//             unread: unread,
                })
//               })
//             })
//           })
//         })
      })
//     })
//   })
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
        }).then(function (){
          res.redirect('/auth');
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
