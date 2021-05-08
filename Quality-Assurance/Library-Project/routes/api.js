'use strict';
const mongoose = require('mongoose');
const Book = require('../models/Book');


module.exports = function (app) {

  app.get('/api/books', async (req, res) => {
    try {
      let books = await Book.find();
      res.json(books);
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })

  app.post('/api/books', async (req, res) => {
    try {
      let title = req.body.title;
      if(!title) {
        res.end('missing required field title');
      }
      else {
        let book = new Book({
          title
        })
        await book.save();
        res.json(book);
      }
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })

  app.delete('/api/books', async (req, res) => {
    try {
      let book = await Book.deleteMany();
      res.end('complete delete successful');
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })

  app.get('/api/books/:id', async (req, res) => {
    try {
      let bookid = req.params.id;
      if(!bookid) {
        res.end('no book exists');
      }
      else if(!mongoose.isValidObjectId(bookid)) {
        res.end('no book exists');
      }
      else {
        let book = await Book.findById(bookid);
        if(!book) {
          res.end('no book exists');
        }
        else {
          res.json(book);
        }
      }
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })

  app.post('/api/books/:id', async (req, res) => {
    try {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) {
        res.end('missing required field comment');
      }
      else if(!bookid) {
        res.end('no book exists');
      }
      else if(!mongoose.isValidObjectId(bookid)) {
        res.end('no book exists');
      }
      else {
        let book = await Book.findById(bookid);
        if(!book) {
          res.end('no book exists');
        }
        else {
          book.comments.push(comment);
          book.commentcount += 1;
          await book.save();
          res.json(book);
        }
      }
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })

  app.delete('/api/books/:id', async (req, res) => {
    try {
      let bookid = req.params.id;
      if(!bookid) {
        res.end('no book exists');
      }
      else if(!mongoose.isValidObjectId(bookid)) {
        res.end('no book exists');
      }
      else {
        let book = await Book.findByIdAndDelete(bookid);
        if(book) {
          res.end('delete successful')
        }
        else {
          res.end('no book exists')
        }
      }
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })
};
