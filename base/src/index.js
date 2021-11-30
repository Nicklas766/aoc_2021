const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  //const input = (await fs.readFile('input.txt')).toString().split('\n').map(Number);

  if (process.env.part === 'part1') {
    console.log(getSolutionPart1(1));
  }

  if (process.env.part === 'part2') {
    console.log(getSolutionPart2(2));
  }
};

main();
