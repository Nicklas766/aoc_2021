const gridHasBingo = (grid, visitedBingoNumbers) => {
  const rowLength = grid.numbers.length;

  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    let hasFullRow = true;
    let hasFullColumn = true;

    for (let column = 0; column < rowLength; column++) {
      const rowVal = grid.numbers[rowIndex][column];
      const columnVal = grid.numbers[column][rowIndex];

      if (!visitedBingoNumbers.has(rowVal)) {
        hasFullRow = false;
      }

      if (!visitedBingoNumbers.has(columnVal)) {
        hasFullColumn = false;
      }
    }

    if (hasFullRow || hasFullColumn) {
      return true;
    }
  }
  return false;
};

const getSumOfMatches = (grid, visitedBingoNumbers) => grid.numbers.flat()
  .filter((num) => visitedBingoNumbers.has(num))
  .reduce((prev, curr) => prev + curr);

const getWinners = (bingoNumbers, gridsInput) => {
  const visitedBingoNumbers = new Set();
  const gridsThatHaveBingo = new Set();

  const grids = gridsInput.map((grid) => ({
    numbers: grid,
    sum: grid.flat().reduce((prev, curr) => prev + curr),
  }));

  const scoringLastToFirst = bingoNumbers.reduce((totalWinners, bingoNumber) => {
    visitedBingoNumbers.add(bingoNumber);

    return grids.reduce((winners, grid) => {
      if (gridsThatHaveBingo.has(grid)) {
        return winners;
      }

      if (gridHasBingo(grid, visitedBingoNumbers)) {
        gridsThatHaveBingo.add(grid);
        const numToSubract = getSumOfMatches(grid, visitedBingoNumbers);

        return [
          { winningVal: bingoNumber, sum: grid.sum - numToSubract },
          ...winners,
        ];
      }

      return winners;
    }, totalWinners);
  }, []);

  return scoringLastToFirst.reverse();
};

const getSolutionPart1 = (bingoNumbers, gridsInput) => { // Should return when found but decided to re-use part2 logic
  const winner = getWinners(bingoNumbers, gridsInput)[0];
  return winner.winningVal * winner.sum;
};

const getSolutionPart2 = (bingoNumbers, gridsInput) => {
  const last = getWinners(bingoNumbers, gridsInput)[gridsInput.length - 1];
  return last.winningVal * last.sum;
};

module.exports = { getSolutionPart1, getSolutionPart2 };
