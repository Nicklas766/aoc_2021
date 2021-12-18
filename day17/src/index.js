const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const line = (await fs.readFile('input.txt')).toString().split(',');
  const [xStart, xEnd] = line[0].split('x=')[1].split('..').map(Number);
  const [yEnd, yStart] = line[1].split('y=')[1].split('..').map(Number);
  const targetArea = { xStart, xEnd, yEnd, yStart };

  if (process.env.part === 'part1') { console.log(getSolutionPart1(targetArea)) }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(targetArea)) }
};

main();
