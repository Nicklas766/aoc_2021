const foldGrid = (newGrid, removedPart) => {
  for (let row = 0; row < removedPart.length; row++) {
    const rowLength = removedPart[row].length;

    for (let column = 0; column < rowLength; column++) {
      const removedIsMarked = removedPart[row][column] === '#';
      const oldIsMarked = newGrid[row][column] === '#';

      if ((oldIsMarked && removedIsMarked) || removedIsMarked) {
        newGrid[row][column] = '#';
      }
    }
  }
}

const getFoldedByY = (grid, amount) => {
  const removedPart = grid.slice(amount + 1).reverse();
  const newGrid = grid.slice(0, amount);
  foldGrid(newGrid, removedPart);
  return newGrid;
}

const getFoldedByX = (grid, amount) => {
  const removedPart = grid.slice().map(row => row.slice(amount).reverse());
  const newGrid = grid.slice().map(row => row.slice(0, amount));
  foldGrid(newGrid, removedPart);
  return newGrid;
}

const getSolutionPart1 = (grid, instructions) => { // Normally never use loops, except in challenges like these.
  for (instruction of instructions) {
    if (instruction.y) {
      const gridAfterFold = getFoldedByY(grid, instruction.val);
      return gridAfterFold.flat().filter(x => x === '#').length;
    }

    if (instruction.x) {
      const gridAfterFold = getFoldedByX(grid, instruction.val);
      return gridAfterFold.flat().filter(x => x === '#').length;
    }
  }
}

const getSolutionPart2 = (grid, instructions) => { // Normally never use loops, except in challenges like these.
  for (instruction of instructions) {
    if (instruction.y) {
      grid = getFoldedByY(grid, instruction.val);
    }

    if (instruction.x) {
      grid = getFoldedByX(grid, instruction.val);
    }
  }

  return grid.map(row => row.join('')).join('\n');
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
