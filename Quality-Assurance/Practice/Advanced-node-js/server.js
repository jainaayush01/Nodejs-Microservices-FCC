'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const pug = require('pug');
const app = express();
const mongodb = require('mongodb');

const session = require('express-session');
const passport = require('passport');

fccTesting(app); //For FCC testing purposes
app.set('view engine', 'pug');
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.route('/').get((req, res) => {
  // Change the response to render the Pug template
  res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please login' });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  // myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
  done(null, null);
  // });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
