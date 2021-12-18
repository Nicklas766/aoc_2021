const getTringualNumber = (n) => n * (n + 1) / 2;

const getLowestX = (x, xStart, xEnd) => {
  const tringualNumber = getTringualNumber(x);

  if (tringualNumber >= xStart && tringualNumber <= xEnd) return x;

  return getLowestX(x + 1, xStart, xEnd);
}

const xRightOfEnd = (x, targetEnd) => x > targetEnd;
const yBeneathEnd = (y, targetEnd) => y < targetEnd;
const betweenX = (x, targetStart, targetEnd) => x >= targetStart && x <= targetEnd;
const betweenY = (y, targetStart, targetEnd) => y <= targetStart && y >= targetEnd;

const getSolutionPart1 = (targetArea) => {
  return getTringualNumber(Math.abs(targetArea.yEnd) - 1);
}

const getSolutionPart2 = (targetArea) => {
  const lowestAllowedXVelocity = getLowestX(0, targetArea.xStart, targetArea.xEnd); // No need to search with X velocity that'll never reach the target area
  const highestAllowedYVelocity = Math.abs(targetArea.yEnd) - 1; // since this velocity value gives us the highest Y it also is the highest velocity needed to search from

  const isInTargetArea = (x, y) => betweenX(x, targetArea.xStart, targetArea.xEnd) && betweenY(y, targetArea.yStart, targetArea.yEnd);
  const hasGoneToFar = (x, y) =>  xRightOfEnd(x, targetArea.xEnd) || yBeneathEnd(y, targetArea.yEnd);

  let velocityMadeTheProbeLandCorrectlyCount = 0;
  for (let startYVelocity = targetArea.yEnd; startYVelocity <= highestAllowedYVelocity; startYVelocity++) {
    for (let startXVelocity = lowestAllowedXVelocity; startXVelocity <= targetArea.xEnd; startXVelocity++) {

      let xVelocity = startXVelocity;
      let yVelocity = startYVelocity;
      let x = 0;
      let y = 0;

      while (!isInTargetArea(x, y) && !hasGoneToFar(x, y)) {
        x += xVelocity;
        y += yVelocity;
    
        if (xVelocity < 0) xVelocity++;
        if (xVelocity > 0) xVelocity--;
        yVelocity--;
      }

      if (isInTargetArea(x, y)) {
        velocityMadeTheProbeLandCorrectlyCount++;
      }
    }
  }

  return velocityMadeTheProbeLandCorrectlyCount;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2
};
