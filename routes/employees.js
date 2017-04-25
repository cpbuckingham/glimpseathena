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
                res.render("employees/new", {
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
    let userID = req.session.user.id;
    let employeeID = req.params.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("employees").where("id", employeeID).first().then(function (employee){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                    res.render("employees/single", {
                        userID: userID,
                        user: user,
                        submissions: submissions,
                        unread: unread,
                        employee: employee,
                    });
                });
            });
        });
    });
});

router.delete("/:id", function (req, res, next) {
    let employeeID = req.params.id;
    knex("employees").where("id", employeeID).del().then(function (deleted) {
        res.redirect("/auth/dashboard");
    });
});

router.post("/", authorizedUser, function(req, res, next) {
    let userID = req.session.user.id;
    knex("employees").insert({
        user_id: knex.select("id").from("users").where("id", userID),
        full_name: req.body.full_name,
        role: req.body.role,
        hire_date: req.body.hire_date,
    }).then(function (){
        res.redirect("/auth/dashboard");
    });
});

router.put("/:id" ,authorizedUser, function (req, res, next) {
    let employeeID = req.params.id;
    knex("employees").where("id", employeeID).update({
        full_name: req.body.full_name,
        role: req.body.role,
        hire_date: req.body.hire_date,
    }).then(function (){
        res.redirect("/auth/dashboard");
    });
});

module.exports = router;
