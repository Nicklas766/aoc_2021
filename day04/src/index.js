const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const discardEmptyLines = Boolean;
const BOARD_SIZE = 5;
const createRow = (str) => str.replace(/\s\s+/g, ' ').split(' ').filter(Boolean).map(Number);

const main = async () => {
  const input = (await fs.readFile('input.txt')).toString().split('\n');
  const bingoNumbers = input[0].split(',').map(Number);
  const allRows = input.slice(2).filter(discardEmptyLines).map(createRow);
  const intervals = Array.from({ length: allRows.length / BOARD_SIZE }, (_, i) => ({ start: i * BOARD_SIZE, end: i * BOARD_SIZE + BOARD_SIZE }));
  const grids = intervals.reduce((acc, interval) => [allRows.slice(interval.start, interval.end), ...acc], []);

  if (process.env.part === 'part1') { console.log(getSolutionPart1(bingoNumbers, grids)); }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(bingoNumbers, grids)); }
};

main();
