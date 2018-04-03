const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { Users } = require("../models/users");

// User Login Route
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }

  if (req.body.password.length < 6) {
    errors.push({ text: "Password must be at least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    Users.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_msg", "Email already registered");
        res.redirect("/users/register");
      } else {
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            const user = new Users(newUser);
            user
              .save()
              .then(() => {
                return user.generateAuthToken();
              })
              .then((token) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.header('x-auth', token).redirect("/users/login");
              })
              .catch(err => {
                console.log("err", err);
                res.status(400).send(e);
                return;
              });
          });
        });
      }
    });
  }
});

module.exports = router;
