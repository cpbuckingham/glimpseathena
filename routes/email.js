'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const nodemailer = require('nodemailer');


function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}


router.get('/new',authorizedUser, function (req, res, next) {
  let userID = req.session.user.id;
  knex.from('submissions').where({read: false, user_id: userID}).then(function (unread) {
  knex('users').where('id', userID).first().then(function (user){
    knex('patients').where('user_id', userID).then(function (patients){
      knex.from('surveys').innerJoin('submissions', 'surveys.id', 'submissions.user_id').innerJoin('patients','patients.id', 'patients.user_id').where('patients.user_id', userID).then(function (submissions){
           res.render('email/new', {
            user: user,
            patients, patients,
            submissions: submissions,
            unread: unread,
          })
        })
      })
      })
    })
    })

router.post('/', function (req, res) {
  var mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "cameron.p.buckingham@gmail.com",
          pass: process.env.GMAIL_PASS
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.full_name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'cameron.p.buckingham@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('email/new')
      }
      //Yay!! Email sent
      else {
          res.redirect('/auth/patients')
      }
  });
});

module.exports = router
