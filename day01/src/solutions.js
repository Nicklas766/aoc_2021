const getSolutionPart1 = (input) => { // Usually never use loops expect in challenges like these
  let increases = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases += 1;
    }
  }

  return increases;
};

const getSolutionPart2 = (input) => { // Usually never use loops expect in challenges like these
  let prevThreeWindowSum;
  let increases = 0;

  for (let i = 2; i < input.length; i++) {
    const currThreeWindowSum = input[i - 2] + input[i - 1] + input[i];

    if (prevThreeWindowSum < currThreeWindowSum) {
      increases += 1;
    }

    prevThreeWindowSum = currThreeWindowSum;
  }

  return increases;
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
