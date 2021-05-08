const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let _idtest;
  suite('Tests for POST request to /api/issues/{project}', () => {
    test('Create an issue with every field', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'test title',
          issue_text: 'test text',
          created_by: 'test author',
          status_text: 'test status',
          assigned_to: 'test assignee'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'status_text');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, '_id');
          assert.property(res.body, 'open');

          _idtest = res.body._id;
          assert.equal(res.body.assigned_to, 'test assignee');
          assert.equal(res.body.status_text, 'test status');
          assert.equal(res.body.issue_text, 'test text');
          assert.equal(res.body.issue_title, 'test title');
          assert.equal(res.body.created_by, 'test author');
          assert.equal(res.body.open, true);

          done();
        })
    })

    test('Create an issue with only required fields', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'test title',
          issue_text: 'test text',
          created_by: 'test author'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'status_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');

          assert.equal(res.body.issue_title, 'test title');
          assert.equal(res.body.issue_text, 'test text');
          assert.equal(res.body.created_by, 'test author');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.open, true);

          done();
        })
    })

    test('Create an issue with missing required fields', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'test title',
          created_by: 'test author'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'required field(s) missing');
          
          done();
        })
    })
  })


  suite('Tests for GET request to /api/issues/{project}', () => {
    test('View issues on a project', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body)
          
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'open');

          done();
        })
    })

    test('View issues on a project with one filter', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .query({
          "issue_title": "test title" 
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body)
          
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'open');

          assert.equal(res.body[0].issue_title, 'test title');
          done();
        })
    })

    test('View issues on a project with multiple filters', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .query({
          "issue_title": "test title",
          "open": true
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body)
          
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'open');

          assert.equal(res.body[0].issue_title, 'test title');
          assert.equal(res.body[0].open, true);
          done();
        })
    })
  })


  suite('Tests for PUT request to /api/issues/{project}', () => {
    test('Update one field on an issue:', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          "_id": _idtest,
          "issue_text": "updated text"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'result');
          assert.property(res.body, '_id');

          assert.equal(res.body._id, _idtest);
          assert.equal(res.body.result, 'successfully updated');

          done();
        })
    })

    test('Update multiple fields on an issue', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          "_id": _idtest,
          "issue_text": "updated text",
          "open": false
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'result');
          assert.property(res.body, '_id');

          assert.equal(res.body._id, _idtest);
          assert.equal(res.body.result, 'successfully updated');

          done();
        })
    })

    test('Update an issue with missing _id', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          "issue_text": "updated text",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'missing _id');

          done();
        })
    })

    test('Update an issue with no fields to update', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          "_id": _idtest
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'no update field(s) sent');

          done();
        })
    })
  })
});
