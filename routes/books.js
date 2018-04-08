const express = require('express');
const router = express.Router();
const { Books } = require("../models/books");

const { ensureAuthenticated } = require('../helpers/auth');

router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Books.findById(req.params.id)
  .then(book => {
    if (book.user !== req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/books');
    } else {
      res.render("books/edit", { book });
    }
  });
});

router.post('/add', ensureAuthenticated, (req, res) => {
  const book = new Books({
    title: req.body.title,
    cover: req.body.cover,
    authors: req.body.authors,
    user: req.user.id
  });

  book.save()
    .then(() => {
      res.redirect('/books');
    })
})

router.post("/", ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("books/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    };
    const books = new Books(newUser);

    book.save().then(book => {
      req.flash('success_msg', 'Book added');
      res.redirect("/books");
    });
  }
});

router.get("/", ensureAuthenticated, (req, res) => {
  Books.find({user: req.user.id})
    .sort({ date: "desc" })
    .then(books => {
      const currentlyReading = []
      const finishedBooks = books.filter(book => {
        if (!book.finishedDate) {
          currentlyReading.push(book)
        } else {
          return book;
        };
      });
      const currentBooks = [...currentlyReading, ...finishedBooks];
      const totalBooks = books.length;
      const currentTotal = currentlyReading.length || 0;
      const finishedTotal = finishedBooks.length || 0;

      res.render("books/list", { books: currentBooks, finishedTotal, currentTotal, totalBooks, containerClass: 'mybooks-list' });
    });
});

router.put("/:id", ensureAuthenticated, (req, res) => {
  Books.findById(req.params.id)
    .then(book => {
      const now = new Date();
      book.finishedDate = now;
      book.finishedYear = now.getFullYear();
      return book.save()
    })
    .then(book => {
      req.flash('success_msg', 'Book Finished!');
      res.redirect('/books')
    })
    .catch(err => console.log(err))
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Books.deleteOne({_id: req.params.id})
    .then((book) => {
      req.flash('success_msg', 'Book removed');
      res.redirect('/books')
    })
});

module.exports = router;
