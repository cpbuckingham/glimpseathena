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

router.get("/", authorizedUser, function(req, res, next) {
    res.render("dashboard/dashboard");
});

router.delete("/:id", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex("users").where("id", userID).del().then(function (deleted) {
        res.redirect("/");
    });
});

router.put("/:id", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex("users").where("id", userID).update({
        username: req.body.username,
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        avatar: req.body.avatar,
        bio: req.body.bio,
        company_name: req.body.company_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
    }).then(function (){
        res.redirect("/auth/user");
    });
});

module.exports = router;
