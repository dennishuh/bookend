const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  startedDate: {
    type: Date,
    default: Date.now
  },
  startedYear: {
    type: Number,
    default: new Date().getFullYear()
  },
  finishedDate: {
    type: Date
  },
  finishedYear: {
    type: Number
  },
  note: {
    type: String
  }
});

const Books = mongoose.model('Books', BookSchema);

module.exports = {
  Books
}
