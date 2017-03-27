'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const users = require('./routes/users');
const auth = require('./routes/auth');
const patients = require('./routes/patients');
const messages = require('./routes/messages');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: "glimpseathena",
}))

app.use('/users', users);
app.use('/auth', auth);
app.use('/patients', patients);
app.use('/messages', messages);

app.listen(port, function () {
  console.log('hello from', port);
});

module.exports = app;
