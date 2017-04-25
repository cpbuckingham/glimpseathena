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
            res.render("patients/new", {
                user: user,
                unread: unread,
            });
        });
    });
});

router.get("/:id", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    let submissionID = req.params.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex.from("patients").innerJoin("submissions", "patients.id", "submissions.patient_id").first().where("submissions.id", submissionID).then(function (patient){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.survey_id").first().where("submissions.id", submissionID).then(function (submission){
                    res.render("submissions/single", {
                        user: user,
                        submission: submission,
                        unread: unread,
                        patient: patient,
                    });
                });
            });
        });
    });
});

router.delete("/:id", authorizedUser, function (req, res, next) {
    let submissionID = req.params.id;
    knex("submissions").where("id", submissionID).del().then(function (deleted) {
        res.redirect("/auth/submissions");
    });
});

router.put("/:id", authorizedUser, function(req, res, next) {
    let submissionID = req.params.id;
    knex("submissions").where("id", submissionID).update({
        read: true,
    }).then(function (){
        res.redirect("/auth/submissions");
    });
});

module.exports = router;
