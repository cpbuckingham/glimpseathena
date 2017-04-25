"use strict";
/*eslint no-unused-vars: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.render("partials/404");
    }
}

router.get("/new", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                res.render("surveys/new", {
                    userID: userID,
                    user: user,
                    submissions: submissions,
                    unread: unread,
                });
            });
        });
    });
});

router.get("/:id", authorizedUser, function (req, res, next) {
    let surveyID = req.params.id;
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("surveys").where("id", surveyID).first().then(function (survey){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                    res.render("surveys/edit", {
                        survey: survey,
                        user: user,
                        submissions: submissions,
                        unread: unread,
                    });
                });
            });
        });
    });
});

router.get("/:id/submission", function (req, res, next) {
    let surveyID = req.params.id;
    knex("surveys").where("id", surveyID).first().then(function (survey){
        res.render("surveys/single", {
            survey: survey
        });
    });
});

router.delete("/:id", authorizedUser, function (req, res, next) {
    let surveyID = req.params.id;
    knex("surveys").where("id", surveyID).del().then(function (deleted) {
        res.redirect("/auth/surveys");
    });
});


router.post("/", authorizedUser, function(req, res, next) {
    let userID = req.session.user.id;
    knex("surveys").insert({
        user_id: userID,
        title: req.body.title,
        type: req.body.type,
        status_on: req.body.status_on,
        question_1: req.body.question_1,
        question_2: req.body.question_2,
        question_3: req.body.question_3,
        question_4: req.body.question_4,
        question_5: req.body.question_5,
    }).then(function (){
        res.redirect("/auth/surveys");
    });
});

router.put("/:id", authorizedUser, function (req, res, next) {
    let surveyID = req.params.id;
    knex("surveys").where("id", surveyID).update({
        title: req.body.title,
        type: req.body.type,
        status_on: req.body.status_on,
        question_1: req.body.question_1,
        question_2: req.body.question_2,
        question_3: req.body.question_3,
        question_4: req.body.question_4,
        question_5: req.body.question_5,
    }).then(function (){
        res.redirect("/auth/surveys");
    });
});

router.post("/:id", function(req, res, next) {
    let surveyID = req.params.id;
    knex("submissions").insert({
        user_id: knex("users").where("last_name", req.body.last_name).select("id"),
        patient_id: knex("patients").where("email", req.body.email).select("id"),
        survey_id: surveyID,
        answer_1: req.body.answer_1,
        answer_2: req.body.answer_2,
        answer_3: req.body.answer_3,
        answer_4: req.body.answer_4,
        answer_5: req.body.answer_5,
    }).then(function (){
        res.render("partials/thank_you");
    });
});

module.exports = router;
