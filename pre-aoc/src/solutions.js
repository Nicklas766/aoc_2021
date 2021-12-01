const { isPrime, isEven } = require('./utils');

const getSolutionPart1 = (numbers) => numbers.reduce(
  (acc, num, i) => (isPrime(num) ? acc + (num * i) : acc), 0
);

const getSolutionPart2 = (numbers) => numbers.reduce((acc, num, i) => {
  if (isPrime(num)) {
    return acc;
  }

  return isEven(i) ? acc + num : acc - num;
}, 0);

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
