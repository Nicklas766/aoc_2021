const createCollectLocationsForBasin = (heightmap) => {
  const visitedCoordinates = new Set();
  
  const collectLocationsForBasin = (row, column, acc) => {
    const keyForPosition = row + ':' + column;
    const line = heightmap[row];
    const currentNumber = line?.[column];
    const stopSearch = currentNumber === 9 || !Number.isInteger(currentNumber);

    if (visitedCoordinates.has(keyForPosition)) {
      return acc;
    }

    if (stopSearch) {
      return acc;
    }

    visitedCoordinates.add(keyForPosition);
    
    return [
      currentNumber,
      ...collectLocationsForBasin(row - 1, column, []), // up
      ...collectLocationsForBasin(row + 1, column, []), // down
      ...collectLocationsForBasin(row, column + 1, []), // right
      ...collectLocationsForBasin(row, column - 1, []), // left
    ];
  };

  return collectLocationsForBasin;
}

const getLowPoints = (heightmap) => {
  const keepValidNumbers = (compareNums) => compareNums.filter(Number.isInteger);
  const isLowPoint = (number, compareNums) => compareNums.filter(x => x > number).length === compareNums.length;
  const foundLowPoints = [];

  for (let row = 0; row < heightmap.length; row++) {
    const line = heightmap[row];

    for (let column = 0; column < line.length; column++) {
      const up = heightmap[row - 1]?.[column];
      const down = heightmap[row + 1]?.[column];
      const left = line[column - 1];
      const right = line[column + 1];

      const checkablePositions = keepValidNumbers([up, down, left, right]);
      const possibleLowPoint = line[column];

      if (isLowPoint(possibleLowPoint, checkablePositions)) {
        foundLowPoints.push({
          column,
          row,
          val: possibleLowPoint,
        });
      }
    }
  }

  return foundLowPoints;
}


const getSolutionPart1 = (heightmap) => {
  const lowPoints = getLowPoints(heightmap);

  return lowPoints.reduce((prev, curr) => prev + curr.val + 1, 0);
}

const getSolutionPart2 = (heightmap) => {
  const collectLocationsForBasin = createCollectLocationsForBasin(heightmap);
  const lowPoints = getLowPoints(heightmap);
  const foundBasins = [];

  for (lowPoint of lowPoints) {
    const locations = collectLocationsForBasin(lowPoint.row, lowPoint.column, []);

    if (locations.length) {
      foundBasins.push(locations.length);
    };
  }
  
  const highToLow = foundBasins.sort((a, b) => b - a);
  const [max1, max2, max3] = highToLow;
  
  return max1 * max2 * max3;
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
