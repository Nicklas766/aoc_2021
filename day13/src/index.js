const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const getPreparedData = async () => {
  const input = (await fs.readFile('input.txt')).toString().split('\n');
  const indexToSeparatearksAndInstructions = input.findIndex((line) => line === '');

  const markedPositions = input.slice(0, indexToSeparatearksAndInstructions).map((line) => {
    const [x, y] = line.split(',');
    return { x: Number(x), y: Number(y) };
  });

  const instructions = input.slice(indexToSeparatearksAndInstructions + 1).map((line) => {
    const splitLine = line.split('=');
    const val = Number(splitLine[splitLine.length - 1]);
    const isY = line.includes('y');
    return { y: isY, x: !isY, val }
  });

  const maxY = Math.max(...markedPositions.map((pos) => pos.y));
  const maxX = Math.max(...markedPositions.map((pos) => pos.x));

  const grid = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => '.'));

  markedPositions.forEach((pos) => {
    grid[pos.y][pos.x] = '#';
  });

  return {
    grid,
    instructions,
  };
}

const main = async () => {
  const { grid, instructions } = await getPreparedData();

  if (process.env.part === 'part1') { console.log(getSolutionPart1(grid, instructions)); }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(grid, instructions)); }
};

main();
