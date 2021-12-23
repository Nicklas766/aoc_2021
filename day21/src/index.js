const fs = require('fs/promises');
const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const main = async () => {
  const input = (await fs.readFile('input.txt')).toString().split('\n');
  const player1Start = Number(input[0].split(': ')[1]);
  const player2Start = Number(input[1].split(': ')[1]);

  if (process.env.part === 'part1') { console.log(getSolutionPart1(player1Start, player2Start)) }
  if (process.env.part === 'part2') { console.log(getSolutionPart2(player1Start, player2Start)) }
};

main();
