"use strict";
/*eslint no-console: 0*/
/*eslint no-undef: 0*/

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");

const users = require("./routes/users");
const auth = require("./routes/auth");
const patients = require("./routes/patients");
const surveys = require("./routes/surveys");
const submissions = require("./routes/submissions");
const email = require("./routes/email");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    secret: "glimpseathena",
}));

app.use("/users", users);
app.use("/auth", auth);
app.use("/patients", patients);
app.use("/surveys", surveys);
app.use("/submissions", submissions);
app.use("/email", email);

app.listen(port, function () {
    console.log("hello from", port);
});

module.exports = app;
