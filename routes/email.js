"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const nodemailer = require("nodemailer");

function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.render("partials/404");
    }
}

router.get("/:id",authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    let patientID = req.params.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("patients").where("user_id", userID).then(function (patients){
                knex("patients").where("id", patientID).first().then(function (patient){
                    knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                        res.render("email/new", {
                            user: user,
                            patients, patients,
                            submissions: submissions,
                            unread: unread,
                            patient: patient,
                        });
                    });
                });
            });
        });
    });
});

router.post("/:id", function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
  //Mail options
    mailOpts = {
        from: req.body.user, //grab form data from the request body object
        to: req.body.email,
        subject: "Welcome to Glimpse",
        text: req.body.message,
        bcc: "cameron.p.buckingham@gmail.com"
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
        if (error) {
            res.render("partials/402");
        }
      //Yay!! Email sent
        else {
            res.redirect("/auth/patients");
        }
    });
});

module.exports = router;
