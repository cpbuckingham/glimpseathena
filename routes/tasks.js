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
            knex("employees").where("user_id", userID).then(function (employees){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                    res.render("tasks/new", {
                        userID: userID,
                        user: user,
                        submissions: submissions,
                        unread: unread,
                        employees:employees,
                    });
                });
            });
        });
    });
});

router.get("/:id", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                res.render("tasks/single", {
                    userID: userID,
                    user: user,
                    submissions: submissions,
                    unread: unread,
                });
            });
        });
    });
});

router.delete("/:id", function (req, res, next) {
    let taskID = req.params.id;
    knex("tasks").where("id", taskID).del().then(function (deleted) {
        res.redirect("/auth/dashboard");
    });
});

router.post("/", authorizedUser, function(req, res, next) {
    let userID = req.session.user.id;
    knex("tasks").insert({
        note: req.body.note,
        user_id: knex.select("id").from("users").where("id", userID),
        employee_id: knex("employees").where("full_name", req.body.full_name).select("id"),
    }).then(function (){
        res.redirect("/auth/dashboard");
    });
});

router.put("/:id" ,authorizedUser, function (req, res, next) {
    let taskID = req.params.id;
    knex("tasks").where("id", taskID).update({
        // email: req.body.email,
        // full_name: req.body.full_name,
        // address: req.body.address,
        // city: req.body.city,
        // state: req.body.state,
        // postal_code: req.body.postal_code,
    }).then(function (){
        res.redirect("/auth/dashboard");
    });
});

module.exports = router;
