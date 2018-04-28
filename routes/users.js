const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const validateRegisterInput = require('../validation/registration');
const validateLoginInput = require('../validation/login');

const User = require("../models/users");
const keys = require("../config/keys");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secret,
          { expiresIn: "2 days" },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ loggedIn: false });
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
    res.json({
      errors: errors
    });
  } else {
    Users.findOne({ email: req.body.email }).then(user => {
      if (user) {
        erors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const registeredUser = new Users(newUser);
            registeredUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;
