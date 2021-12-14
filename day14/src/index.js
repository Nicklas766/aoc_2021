const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const getPairToLetter = (str) => str.reduce((acc, line) => {
  const [key, val] = line.split(' -> ');
  return {
    ...acc,
    [key]: val,
  }
}, {});

const main = async () => {
  const input = (await fs.readFile('input.txt')).toString().split('\n');
  const template = input.slice(0, 1)[0];
  const pairToLetter = getPairToLetter(input.slice(2));

  if (process.env.part === 'part1') { console.log(getSolutionPart1(template, pairToLetter)); }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(template, pairToLetter)); }
};

main();
