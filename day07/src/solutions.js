const getDistanceBetweenNumbers = (a, b) => Math.abs(a - b);
const getLowestFuelAmountSpent = (fuelArr) => fuelArr.reduce((prev, curr) => prev < curr ? prev : curr);

const getSolutionPart1 = (startingPositions) => {
  const max = Math.max(...startingPositions);
  const fuelSpentAtPos = [];

  for (let targetPos = 0; targetPos <= max; targetPos++) {
    for (startPos of startingPositions) {
      fuelSpentAtPos[targetPos] ??= 0;
      fuelSpentAtPos[targetPos] += getDistanceBetweenNumbers(startPos, targetPos);
    }
  }

  return getLowestFuelAmountSpent(fuelSpentAtPos);
}

const getSolutionPart2 = (startingPositions) => {
  const max = Math.max(...startingPositions);
  const fuelSpentAtPos = [];

  for (let targetPos = 0; targetPos <= max; targetPos++) {
    for (startPos of startingPositions) {
      const n = getDistanceBetweenNumbers(startPos, targetPos);
      const seriesSum = (n * (n + 1)) / 2;

      fuelSpentAtPos[targetPos] ??= 0;
      fuelSpentAtPos[targetPos] += seriesSum;
    }
  }

  return getLowestFuelAmountSpent(fuelSpentAtPos);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
