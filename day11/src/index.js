const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const grid = (await fs.readFile('input.txt'))
  .toString()
  .split('\n')
  .map(line => line.split('').map(Number));

  if (process.env.part === 'part1') { console.log(getSolutionPart1(grid)); }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(grid)); }
};

main();
