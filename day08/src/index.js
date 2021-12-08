const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const lines = (await fs.readFile('input.txt'))
  .toString()
  .split('\n')
  .map(line => line.replace(' |', '').split(' ').map(pattern => ({ sorted: pattern.split('').sort().join(''), pattern })));

  if (process.env.part === 'part1') { console.log(getSolutionPart1(lines)) }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(lines)) }
};

main();
