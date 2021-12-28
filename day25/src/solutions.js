const EAST = '>';
const SOUTH = 'v';
const EMPTY = '.';

const tryToMoveEast = (grid) => {
  const oldState = structuredClone(grid);
  const xLength = grid[0].length;
  let didMove = false;

  oldState.forEach((row, y) => {
    row.forEach((point, x) => {
      const nextXPos = (x + 1) % xLength
      const nextValue = oldState[y][nextXPos];
      const canMove = nextValue === EMPTY;

      if (point === EAST && canMove) {
        grid[y][x] = EMPTY;
        grid[y][nextXPos] = EAST;
        didMove = true;
      }
    });
  });

  return didMove;
}

const tryToMoveSouth = (grid) => {
  const oldState = structuredClone(grid);
  const yLength = grid.length;
  let didMove = false;

  oldState.forEach((row, y) => {
    row.forEach((point, x) => {
      const nextYPos = (y + 1) % yLength;
      const nextValue = oldState[nextYPos][x];
      const canMove = nextValue === EMPTY;

      if (point === SOUTH && canMove) {
        grid[y][x] = EMPTY;
        grid[nextYPos][x] = SOUTH;
        didMove = true;
      }
    });
  });

  return didMove;
}

const tryToMove = (grid) => {
  const movedEast = tryToMoveEast(grid);
  const movedSouth = tryToMoveSouth(grid);

  return movedEast || movedSouth;
}

const getSolutionPart1 = (input) => { 
  let stepsTaken = 1;
  while (tryToMove(input)) {
    stepsTaken++;
  }
  
  return stepsTaken;
};

const getSolutionPart2 = (input) => {
  return 'need more stars';
};

module.exports = { getSolutionPart1, getSolutionPart2 };
