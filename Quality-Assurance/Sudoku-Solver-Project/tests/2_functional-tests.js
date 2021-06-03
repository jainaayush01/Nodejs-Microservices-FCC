const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  let validPuzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

  let solvedPuzzleString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

  let invalidPuzzleString = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

  let invalidPuzzleChars = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....a26914.37.';

  let invalidPuzzleLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.1';

  suite('Route Testing for POST request to /api/solve', () => {
    test('Solve a puzzle with valid puzzle string', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle: validPuzzleString
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'solution');
          assert.equal(res.body.solution, solvedPuzzleString);

          done();
        })
    })

    test('Solve a puzzle with missing puzzle string', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field missing');

          done();
        })
    })

    test('Solve a puzzle with invalid characters', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle: invalidPuzzleChars
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');

          done();
        })
    })

    test('Solve a puzzle with incorrect length', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle: invalidPuzzleLength
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');

          done();
        })
    })

    test('Solve a puzzle that cannot be solved', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle: invalidPuzzleString
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Puzzle cannot be solved');

          done();
        })
    })
  })  

  suite('Route Testing for POST request to /api/check', () => {

    test('Check a puzzle placement with all fields', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A2',
          value: '3'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'valid');
          assert.equal(res.body.valid, true);

          done();
        })
    })

    test('Check a puzzle placement with single placement conflicts', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A2',
          value: '1'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'valid');
          assert.equal(res.body.valid, false);

          assert.property(res.body, 'conflict');
          assert.lengthOf(res.body.conflict, 1);

          done();
        })
    })

    test('Check a puzzle placement with multiple placement conflicts', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A2',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'valid');
          assert.equal(res.body.valid, false);

          assert.property(res.body, 'conflict');
          assert.lengthOf(res.body.conflict, 3);

          done();
        })
    })

    test('Check a puzzle placement with all placement conflicts', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A2',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'valid');
          assert.equal(res.body.valid, false);

          assert.property(res.body, 'conflict');
          assert.lengthOf(res.body.conflict, 3);

          done();
        })
    })

    test('Check a puzzle placement with missing required fields', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A4'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field(s) missing');

          done();
        })
    })

    test('Check a puzzle placement with invalid characters', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: invalidPuzzleChars,
          coordinate: 'A4',
          value: '3'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');

          done();
        })
    })

    test('Check a puzzle placement with incorrect length', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: invalidPuzzleLength,
          coordinate: 'A4',
          value: '3'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');

          done();
        })
    })

    test('Check a puzzle placement with invalid placement coordinate', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'K4',
          value: '5'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid coordinate');

          done();
        })
    })

    test('Check a puzzle placement with invalid placement value', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzleString,
          coordinate: 'A3',
          value: 'a'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid value');

          done();
        })
    })
    
  })

});

