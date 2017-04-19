"use strict";
/*eslint no-unused-lets: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const createAvatar = require("../public/js/octodex_avatar");

function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.render("404");
    }
}

router.get("/dashboard",  function (req, res) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                res.render("dashboard/dashboard", {
                    user: user,
                    submissions: submissions,
                    unread: unread,
                });
            });
        });
    });
});

router.get("/patients",authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("patients").where("user_id", userID).then(function (patients){
                knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                    res.render("dashboard/patient", {
                        user: user,
                        patients, patients,
                        submissions: submissions,
                        unread: unread,
                    });
                });
            });
        });
    });
});

router.get("/user",authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                res.render("dashboard/user", {
                    user: user,
                    submissions: submissions,
                    unread: unread,
                });
            });
        });
    });
});

router.get("/submissions",authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("surveys").where("user_id", userID).then(function (surveys){
                knex.from("patients").innerJoin("submissions", "patients.id", "submissions.patient_id").where("submissions.user_id", userID).then(function (submissions){
                    res.render("dashboard/submissions", {
                        user: user,
                        surveys:surveys,
                        submissions: submissions,
                        unread: unread,
                    });
                });
            });
        });
    });
});


router.get("/surveys",authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    knex.from("submissions").where({read: false, user_id: userID}).then(function (unread) {
        knex("users").where("id", userID).first().then(function (user){
            knex("patients").where("user_id", userID).then(function (patients){
                knex("surveys").where("user_id", userID).then(function (surveys){
                    knex.from("surveys").innerJoin("submissions", "surveys.id", "submissions.user_id").innerJoin("patients","patients.id", "patients.user_id").where("patients.user_id", userID).then(function (submissions){
                        res.render("dashboard/survey", {
                            user: user,
                            patients, patients,
                            surveys:surveys,
                            submissions: submissions,
                            unread: unread,
                        });
                    });
                });
            });
        });
    });
});

router.get("/signup", function (req, res, next) {
    res.render("auth/signup", {
        hasError : false,
        email: "",
    });
});

router.get("/login", function (req, res, next) {
    if (res.cookie("signedin", true)){
        req.flash("info", "Thanks for Signing up, now Login");
        res.render("auth/login")
      } else {
        res.render("auth/login")
      };
    });

router.post("/signup", function (req, res, next) {
    knex("users").where({
        email: req.body.email
    }).first().then(function(user){
        if(!user){
            let ssv = checkAuth(req);
            if(!ssv.hasError){
                let hash = bcrypt.hashSync(req.body.password, 12);
                createAvatar.generateAvatar(function(created_avatar){
                    return knex("users").insert({
                        email: req.body.email,
                        hashed_password: hash,
                        avatar: created_avatar,
                        username: req.body.username,
                    }).then(function (){
                        res.cookie("signedin", true);
                        res.redirect("/auth/login");
                    });
                });
            } else {
                res.render("auth/signup", ssv);
            }
        } else {
            res.render("partials/405");
        }
    });
});

router.post("/login", function (req, res, next) {
    knex("users").where({
        email: req.body.email
    }).first().then(function (user) {
        if(!user){
            res.render("partials/404");
        } else {
            bcrypt.compare(req.body.password, user.hashed_password, function(err, result) {
                if(result){
                    req.session.user = user;
                    res.cookie("loggedin", true);
                    res.redirect("/auth/dashboard");
                } else {
                    res.render("partials/403");
                }
            });
        }
    });
});

router.get("/logout", function (req, res) {
    req.session = null;
    res.clearCookie("loggedin");
    res.redirect("/");
});

function checkAuth(req){
  let info = {};
    info.hasError = false;
    info.error = {};
    checkRequired(info, req);
    checkEmail(info, req);
    return info;
}

function checkEmail(info, req){
  let str = req.body.email;
  let atFound = false;
  let dotFound = false;

  for(let i=1; i < str.length; i++){
      if(str[i] === "@" || atFound){
          if(atFound && str[i] === "."){
              dotFound = true;
          }
          atFound = true;
      }
  }
    if(atFound && dotFound){
        info.email = req.body.email;
    }
    else {
        if(!info.error.email){
            info.error.email = [];
        }
        info.hasError = true;
        info.error.email.push({message : "email is malformed."});
    }
}

function checkRequired(info, req){
  for(var item in req.body){
    info[item] = req.body[item];
    if(req.body[item].length <= 0)
    {
      if(!info.error[item])
      {
        info.error[item] = [];
      }
      info.hasError = true;
      info.error[item].push({message: item + " is required."});
    }
  }
}

module.exports = router;
