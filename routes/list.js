const express = require('express');
const router = express.Router();
const axios = require('axios');
const keys = require('../config/keys');
const googlebookapi = 'https://www.googleapis.com/books/v1/volumes?q='
const searchSize = 25;

router.post('/', (req, res) => {
  var encoded = encodeURI(req.body.terms)
  axios.get(`${googlebookapi}${encoded}&key=${keys.googleAPIKey}`)
    .then((response) => {
      let searchItems = response.data.items.slice(0, searchSize);
      res.render('search/list', {searchItems});
    })
    .catch((err) => {
      req.flash('error_msg', `Error from google api ${err}`);
      res.redirect('/');
    })
});

module.exports = router;
