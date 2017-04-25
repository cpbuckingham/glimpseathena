"use strict";
/*eslint no-unused-vars: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/js/octodex_avatar");

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
                res.render("patients/new", {
                    user: user,
                    submissions: submissions,
                    unread: unread,
                });
            });
        });
    });
});

router.get("/:id/edit", authorizedUser, function (req, res, next) {
    let patientID = req.params.id;
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("patients").where("id", patientID).first().then(function (patient){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                    res.render("patients/edit", {
                        patient: patient,
                        user: user,
                        submissions: submissions,
                        unread: unread,
                    });
                });
            });
        });
    });
});

router.delete("/:id", function (req, res, next) {
    let patientID = req.params.id;
    knex("patients").where("id", patientID).del().then(function (deleted) {
        res.redirect("/auth/patients");
    });
});

router.post("/", authorizedUser, function(req, res, next) {
    let userID = req.session.user.id;
    createAvatar.generateAvatar(function(created_avatar){
        knex("patients").insert({
            email: req.body.email,
            full_name: req.body.full_name,
            avatar: created_avatar,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,
            user_id: knex.select("id").from("users").where("id", userID)
        }).then(function (){
            res.redirect("/auth/patients");
        });
    });
});

router.put("/:id" ,function (req, res, next) {
    let patientID = req.params.id;
    knex("patients").where("id", patientID).update({
        email: req.body.email,
        full_name: req.body.full_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
    }).then(function (){
        res.redirect("/auth/patients");
    });
});

module.exports = router;
