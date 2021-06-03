const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  let validPuzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

  let solvedPuzzleString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

  let invalidPuzzleString = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

  let invalidPuzzleChars = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....a26914.37.';

  let invalidPuzzleLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.1';

  suite('Tests for Logic Handler', () => {

    test('Logic handles a valid puzzle string of 81 characters.', (done) => {
      let valid = solver.validate(validPuzzleString);
      assert.equal(valid, true);
      done();
    })

    test('Logic handles a puzzle string with invalid characters.', (done) => {
      let valid = solver.validate(invalidPuzzleChars);
      assert.property(valid, 'error');
      assert.equal(valid.error, 'Invalid characters in puzzle');
      done();
    })

    test('Logic handles a puzzle string that is not 81 characters in length.', (done) => {
      let valid = solver.validate(invalidPuzzleLength);
      assert.property(valid, 'error');
      assert.equal(valid.error, 'Expected puzzle to be 81 characters long');
      done();
    })

    test('Logic handles a valid row placement.', (done) => {
      let checkRow = solver.checkRowPlacement(validPuzzleString, 1, 2, 3);
      assert.equal(checkRow, true);
      done();
    })

    test('Logic handles an invalid row placement.', (done) => {
      let checkRow = solver.checkRowPlacement(validPuzzleString, 1, 2, 5);
      assert.equal(checkRow, false);
      done();
    })

    test('Logic handles a valid column placement.', (done) => {
      let checkCol = solver.checkColPlacement(validPuzzleString, 1, 2, 3);
      assert.equal(checkCol, true);
      done();
    })

    test('Logic handles an invalid column placement.', (done) => {
      let checkCol = solver.checkColPlacement(validPuzzleString, 1, 2, 2);
      assert.equal(checkCol, false);
      done();
    })

    test('Logic handles a valid region placement.', (done) => {
      let checkRegion = solver.checkRegionPlacement(validPuzzleString, 1, 2, 3);
      assert.equal(checkRegion, true);
      done();
    })

    test('Logic handles an invalid region placement.', (done) => {
      let checkRegion = solver.checkRegionPlacement(validPuzzleString, 1, 2, 6);
      assert.equal(checkRegion, false);
      done();
    })

    test('Valid puzzle strings pass the solver', (done) => {
      let solved = solver.solve(validPuzzleString);
      assert.equal(solved, solvedPuzzleString)
      done();
    })

    test('Invalid puzzle strings fail the solver', (done) => {
      let solved = solver.solve(invalidPuzzleString);
      assert.equal(solved, false);
      done();
    })

    test('Solver returns the the expected solution for an incomplete puzzle', (done) => {
      let solved = solver.solve(validPuzzleString);
      assert.equal(solved, solvedPuzzleString)
      done();
    })
  })
});