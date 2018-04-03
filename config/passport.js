const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User models
const {Users} = require("../models/users");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        Users.findOne({email: email})
          .then(user => {
            if (!user) {
              return done(null, false, {message: 'User/Password incorrect'})
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {message: 'User/Password incorrect'})
              }
            })
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
