const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const input = (await fs.readFile('input.txt')).toString().replaceAll('\r', '').split('\n');
  const splitIndex = input.findIndex(line => line === '');
  const algorithm = input[0];
  const img = input.slice(splitIndex + 1);
  
  if (process.env.part === 'part1') { console.log(getSolutionPart1(img, algorithm)) }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(img, algorithm)) }
};

main();
