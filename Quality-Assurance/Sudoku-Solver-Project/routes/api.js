'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {

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
        let solve = solver.solve(puzzle);
        if (solve.hasOwnProperty("error")) {
          res.json({ error: solve.error });
        }
        else {
          res.json({ solution: solve.solution });
        }
      }
    }
  });
};
