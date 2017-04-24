"use strict";
/*eslint no-undef: 0*/

const expect = require( "chai" ).expect;
const app = require( "../server" );
const request = require( "supertest" )( app );
const knex = require("../db/knex");

describe("Test the test", function () {
    it("should pass the test", function () {
        expect(true).to.equal(true);
    });
});

describe("Landing Page", function () {
    it("should display the landing page", function (done) {
        request.get("/")
          .expect(200)
          .end(function (err, res) {
              if(err){
                  done(err);
              }
              expect(res.text).to.contain("Glimpse");
              done();
          });
    });
});

describe("Login Page", function () {
    it("should display login page", function (done) {
        request.get("/auth/login")
          .expect(200)
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              expect(res.text).to.contain("Login");
              done();
          });
    });
});

describe("Register Page", function () {
    it("should display register page", function (done) {
        request.get("/auth/signup")
          .expect(200)
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              expect(res.text).to.contain("Register");
              done();
          });
    });
});

describe("Dashboard Page", function () {
    it("should display a single users information", function (done) {
        request.get("/auth/dashboard")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("users").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.username);
                  done();
              });
          });
    });
});

describe("User Page", function () {
    it("should display a user's name", function (done) {
        request.get("/auth/user")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("users").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.username);
                  done();
              });
          });
    });
});

describe("Survey Page", function () {
    it("should display a survey title", function (done) {
        request.get("/auth/surveys")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("surveys").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.username);
                  done();
              });
          });
    });
});

describe("Submission Page", function () {
    it("should display all submissions", function (done) {
        request.get("/auth/submissions")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("submissions").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.full_name);
                  done();
              });
          });
    });
});

describe("Employee Add/Edit Page", function () {
    it("should display the add/update pages for employees", function (done) {
        request.get("/employees/new")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("employees").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.username);
                  done();
              });
          });
    });
});

describe("Task Add/Edit Page", function () {
    it("should display the add/update pages for tasks", function (done) {
        request.get("/tasks/new")
          .end(function(err, res) {
              if(err){
                  done(err);
              }
              knex("tasks").where("id", 1).first().then(function(data) {
                  expect(res.text).to.contain(data.username);
                  done();
              });
          });
    });
});

//Hardly enough tests here, but it should work for the MVP
