const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const coords = (await fs.readFile('input.txt')).toString().split('\n').map((line) => {
    const trimmedLine = line.trim();
    const replacedArrow = trimmedLine.replace('->', ',');
    return replacedArrow.replaceAll(' ', '').split(',').map(Number);
  });

  if (process.env.part === 'part1') {
    console.log(getSolutionPart1(coords));
  }

  if (process.env.part === 'part2') {
    console.log(getSolutionPart2(coords));
  }
};

main();
