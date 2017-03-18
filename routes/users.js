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
    res.send('restricted')
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
  res.render('users/auth')
})

router.get('/:id', authorizedUser, function (req, res) {
  let current_user = req.session.user;
  let userID = parseInt(req.params.id, 10);
  knex('users').where('id', userID).first().then(function (user){
    knex('users').innerJoin('posts', 'users.id', 'posts.user_id').where('users.id', userID).then(function(posts) {
      knex('comments').where('user_id', userID).then(function (comments){
          knex('users').where('id', 'in', knex.select('buddy_id').from('buddies').where('user_id', userID)).then(function (buddies){
            knex('buddies').where('user_id', current_user.id).then(function (buddyCheck){
            res.render('users/single', {
          user: user,
          posts: posts,
          comments: comments,
          current_user: current_user,
          buddies: buddies,
          userID: userID,
          buddyCheck: buddyCheck,
            })
          })
        })
      })
    })
  })
})

router.get('/:id/edit', authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  if ( parseInt(req.params.id, 10) === req.session.user.id){
    knex('users').where('id', userID).first().then(function (user){
          res.render('users/edit', {user: user})
        })
      }else{
    res.send("403")
    }
  })

router.put('/:id', authorizedUser,function (req, res, next) {
  let userID = req.params.id;
  let hash = bcrypt.hashSync(req.body.hashed_password, 12);
  knex('users').where('id', userID).update({
    username: req.body.username,
    hashed_password: hash,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar,
    goal1: req.body.goal1,
    goal2: req.body.goal2,
    goal3: req.body.goal3,
  }).then(function (){
    res.redirect('/auth')
  } )
})

module.exports = router
