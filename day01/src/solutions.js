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


// Just testing O(N/2) loop - not clean
const getSolutionPart1OptimizedTest = (input) => {
  const inputLength = input.length;
  const halfInputLength = inputLength / 2;
  let increases = 0;

  for (let i = 1; i <= halfInputLength; i++) {
    const i2 = inputLength - i;

    if (input[i] > input[i - 1]) {
      increases += 1;
    }

    if (input[i2 + 1] > input[i2]) {
      increases += 1;
    }
    
    if (inputLength - i === i && input[i] < input[i2]) {
      increases += 1;
    }
  }

  return increases;
};

// Just testing O(N/2) loop - not clean
const getSolutionPart2OptimizedTest = (input) => {
  const inputLength = input.length;
  const halfInputLength = inputLength / 2;
  let prevWindowSum, prevWindowSumInReverse;
  let increases = 0;

  for (let i = 2; i <= halfInputLength; i++) {
    const i2 = inputLength - 1 - i;
    const currWindowSum = input[i - 2] + input[i - 1] + input[i];
    const currWindowSumInReverse = input[i2 + 2] + input[i2 + 1] + input[i2];

    if (prevWindowSum < currWindowSum) {
      increases += 1;
    }

    if (currWindowSumInReverse < prevWindowSumInReverse) {
      increases += 1;
    }

    if (inputLength - i === i && currWindowSum < currWindowSumInReverse) {
      increases += 1;
    }

    prevWindowSum = currWindowSum;
    prevWindowSumInReverse = currWindowSumInReverse;
  }

  return increases;
};

module.exports = {
  getSolutionPart1: getSolutionPart1OptimizedTest,
  getSolutionPart2: getSolutionPart2OptimizedTest,
};
