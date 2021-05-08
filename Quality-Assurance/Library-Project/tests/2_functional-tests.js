/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  let idtest;
  let invalidId = "5871dda29faedc3491ff93bb";
  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: 'book title'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            assert.property(res.body, 'title');
            assert.property(res.body, '_id');

            idtest = res.body._id;

            assert.equal(res.body.title, 'book title')
            done();
          })
      });

      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field title');

            done()
          })
      });

    });


    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books', function(done) {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            assert.isArray(res.body);

            assert.property(res.body[0], 'title');
            assert.property(res.body[0], '_id');
            assert.property(res.body[0], 'commentcount');

            assert.equal(res.body[0].title, 'book title');

            done();
          })
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function(){

      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get('/api/books/' + idtest)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');


            assert.equal(res.body._id, idtest);
            assert.equal(res.body.title, 'book title')
            assert.isArray(res.body.comments);

            done();
          })
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get('/api/books/' + invalidId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');

            done();
          })
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .post('/api/books/' + idtest)
          .send({
            comment: 'test comment'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');


            assert.equal(res.body._id, idtest);
            assert.equal(res.body.title, 'book title')
            assert.isArray(res.body.comments);
            assert.include(res.body.comments, 'test comment');

            done();
          })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .post('/api/books/' + idtest)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field comment');
            
            done();
          })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .post('/api/books/' + invalidId)
          .send({
            comment: 'test comment'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');

            done();
          })
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .delete('/api/books/' + idtest)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful');

            done();
          })
      });

      test('Test DELETE /api/books/[id] with id not in db', function(done){
        chai
          .request(server)
          .delete('/api/books/' + invalidId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');

            done();
          })
      });

    });

  });

});
