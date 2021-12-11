const getAdjacentOctopusesPositions = (y, x) => Object.values({
  up: { y: y - 1, x },
  upRight: { y: y - 1, x: x + 1 },
  upLeft: { y: y - 1, x: x - 1 },
  down: { y: y + 1, x: x },
  downRight: { y: y + 1, x: x + 1 },
  downLeft: { y: y + 1, x: x - 1 },
  left: { y, x: x - 1 },
  right: { y, x: x + 1 },
});

const updateAdjacentOctopuses = (grid, y, x, flashes) => {
  const positions = getAdjacentOctopusesPositions(y, x);
  
  for (let pos of positions) {
    const energy = grid[pos.y]?.[pos.x];
    const hasFlashed = energy === 0;
    const willFlash = energy === 9;
    const shouldIncreaseEnergy = !hasFlashed && !willFlash && Number.isInteger(energy);

    if (shouldIncreaseEnergy) {
      grid[pos.y][pos.x] += 1;
    }

    if (willFlash) {
      flashes.count += 1;
      grid[pos.y][pos.x] = 0;
      updateAdjacentOctopuses(grid, pos.y, pos.x, flashes);
    }
  }
}

const getNewGridForStep = ({ grid, flashes }) => {
  const flashesObj = { count: 0 };
  const increasedGrid = grid.map(row => row.map(column => column + 1));

  increasedGrid.forEach((row, y) => {
    row.forEach((column, x) => {
      const willFlash = column > 9;

      if (willFlash) {
        increasedGrid[y][x] = 0;
        flashesObj.count += 1;
        updateAdjacentOctopuses(increasedGrid, y, x, flashesObj);
      }
    });
  });

  return {
    grid: increasedGrid,
    flashes: flashesObj.count + flashes,
  }
}

const getSolutionPart1 = (grid) => {
  const steps = Array.from({ length: 100 }, (_, i) => i + 1);
  return steps.reduce(getNewGridForStep, { grid, flashes: 0 }).flashes;  
}

const getSolutionPart2 = (grid) => {
  for (let stepsTaken = 1; stepsTaken < Infinity; stepsTaken++) {
    grid = getNewGridForStep({ grid }).grid;

    const gridOnlyContainsZeros = grid.flat().every(column => column === 0);

    if (gridOnlyContainsZeros) {
      return stepsTaken;
    }
  }  
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
