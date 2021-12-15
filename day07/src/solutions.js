const getDistanceBetweenNumbers = (a, b) => Math.abs(a - b);
const getLowestFuelAmountSpent = (fuelArr) => fuelArr.reduce((prev, curr) => prev < curr ? prev : curr);
const getSeriesSum = (n) => (n * (n + 1)) / 2;
const getSeriesSumOfDistance = (a, b) => getSeriesSum(getDistanceBetweenNumbers(a, b));

const getSolutionPart1 = (startingPositions) => {
  const max = Math.max(...startingPositions);
  const fuelSpentAtPos = [];

  for (let targetPos = 0; targetPos <= max / 2; targetPos++) {
    for (startPos of startingPositions) {
      fuelSpentAtPos[targetPos] ??= 0;
      fuelSpentAtPos[targetPos] += getDistanceBetweenNumbers(startPos, targetPos);
      fuelSpentAtPos[max - targetPos] ??= 0;
      fuelSpentAtPos[max - targetPos] += getDistanceBetweenNumbers(startPos, max - targetPos);
    }
  }

  return getLowestFuelAmountSpent(fuelSpentAtPos);
}

const getSolutionPart2 = (startingPositions) => {
  const max = Math.max(...startingPositions);
  const fuelSpentAtPos = [];

  for (let targetPos = 0; targetPos <= max / 2; targetPos++) {
    for (startPos of startingPositions) {
      const seriesSum1 = getSeriesSumOfDistance(startPos, targetPos);
      const seriesSum2 = getSeriesSumOfDistance(startPos, max - targetPos)

      fuelSpentAtPos[targetPos] ??= 0;
      fuelSpentAtPos[targetPos] += seriesSum1;
      fuelSpentAtPos[max - targetPos] ??= 0;
      fuelSpentAtPos[max - targetPos] += seriesSum2;
    }
  }

  return getLowestFuelAmountSpent(fuelSpentAtPos);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
