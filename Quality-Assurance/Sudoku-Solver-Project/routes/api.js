'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {
    console.log(req.body);
    let { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
    }
    else {
      let row = coordinate.split("")[0];
      let col = coordinate.split("")[1];
      let validate = solver.validate(puzzle);
      value = parseInt(value);

      row = solver.letterToNumber(row);
      col = parseInt(col);
      console.log(row, col, value);

      if (coordinate.length !== 2 || !(row >= 1 && row <=9) || !(col >= 1 && col <=9)) {
        res.json({ error: "Invalid coordinate" });
      }
      else if (isNaN(value) || !(value >= 1 && value <=9)) {
        res.json({ error: "Invalid value" });
      }
      else if (validate.hasOwnProperty("error")) {
        res.json({ error: validate.error });
      }
      else {
        let isValuePresent = solver.isFilled(puzzle, row, col, value);
        if(isValuePresent) {
          res.json({ valid: true });
        }

        let checkCol = solver.checkColPlacement(puzzle, row, col, value);
        let checkRow = solver.checkRowPlacement(puzzle, row, col, value);
        let checkRegion = solver.checkColPlacement(puzzle, row, col, value);

        if (checkCol && checkRegion && checkRow) {
          res.json({ valid: true });
        } 
        else {
          let conflicts  = [];
          if (!checkRow) {
            conflicts.push("row");
          }
          if (!checkCol) {
            conflicts.push("column");
          }
          if (!checkRegion) {
            conflicts.push("region");
          }
          res.json({ valid: false, conflict: conflicts });
        }
      }
    }
  });

  app.post('/api/solve', (req, res) => {
    console.log(req.body);
    const puzzle = req.body.puzzle;
    if (!puzzle) {
      res.json({ error: 'Required field missing' });
    }
    else {
      let validate = solver.validate(puzzle);
      if (validate.hasOwnProperty("error")) {
        res.json({ error: validate.error });
      }
      else {
        let solved = solver.solve(puzzle);
        if (!solved) {
          res.json({ error: 'Puzzle cannot be solved' });
        }
        else {
          res.json({ solution: solved });
        }
      }
    }
  });
};
