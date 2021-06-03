class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    if(!(/^[0-9,.]*$/.test(puzzleString))) {
      return {error: 'Invalid characters in puzzle'}
    }
    return {}
  }

  letterToNumber(row) {
    row = row.toUpperCase();
    let code = row.charCodeAt(0);
    code = code - "A".charCodeAt(0) + 1;
    return code;
  }

  isFilled(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
    if(value == grid[row - 1][col - 1]) {
      return true;
    }
    return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);

    if (grid[row - 1][column - 1] !== 0) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);

    if (grid[row - 1][column - 1] !== 0) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, num) {
    let grid = this.transform(puzzleString);

    if (grid[row - 1][col - 1] !== 0) {
      return false;
    }

    let startRow = row - (row % 3), startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) {
          return false;
        }
      }
    }
    return true;
  }

  solveSuduko(grid, row, col) {

    if(col == 9) {
      if(row == 8) {
        return grid;
      }
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) {
      return this.solveSuduko(grid, row, col + 1);
    }

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSuduko(grid, row, col + 1)) {
          return grid;
        }
      }

      grid[row][col] = 0;
    }
    return false;
  }

  isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] == num) {
        return false;
      }
    }

    for (let x = 0; x <= 8; x++) {
      if (grid[x][col] == num) {
        return false;
      }
    }

    let startRow = row - (row % 3), startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) {
          return false;
        }
      }
    }

    return true;
  }

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let row = -1;
    let col = 0;

    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++;
      }
      if (col % 9 == 0) {
        col = 0;
      }

      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  transformBack(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    let grid = this.transform(puzzleString);
    grid = this.solveSuduko(grid, 0, 0);
    if(!grid) {
      return false;
    }
    let solvedPuzzle = this.transformBack(grid);
    return solvedPuzzle;
  }
}

module.exports = SudokuSolver;
