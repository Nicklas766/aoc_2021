// we can only get 3-9 sums of values - so no need to loop extra
// but still we need to keep track of their counts.
const SUM_POSSIBILITIES = [ 
  { roll: 3, count: 1 },
  { roll: 4, count: 3 },
  { roll: 5, count: 6 },
  { roll: 6, count: 7 },
  { roll: 7, count: 6 },
  { roll: 8, count: 3 },
  { roll: 9, count: 1 },
];

const enterUniverse = (player1Placement, player1Score, player2Placement, player2Score, isPlayer1Turn) => {
  if (isPlayer1Turn && player2Score >= 21) {
    return { player1Wins: 0, player2Wins: 1 };
  }

  if (!isPlayer1Turn && player1Score >= 21) {
    return { player1Wins: 1, player2Wins: 0 };
  }

  if (isPlayer1Turn) {
    const wins = { player1Wins: 0, player2Wins: 0 };

    // Enter universes
    for (let { roll, count } of SUM_POSSIBILITIES) {
      const newPosition = (player1Placement + roll) % 10 === 0 ? 10 : (player1Placement + roll) % 10;
      const newScore = player1Score + newPosition;

      const { player1Wins, player2Wins } = enterUniverse(newPosition, newScore, player2Placement, player2Score, false);
      
      wins.player1Wins += player1Wins * count;
      wins.player2Wins += player2Wins * count;
    }

    return wins;
  }

  if (!isPlayer1Turn) {
    const wins = { player1Wins: 0, player2Wins: 0 };

    // Enter universes
    for (let { roll, count } of SUM_POSSIBILITIES) {
      const newPosition = (player2Placement + roll) % 10 === 0 ? 10 : (player2Placement + roll) % 10;
      const newScore = player2Score + newPosition;

      const { player1Wins, player2Wins } = enterUniverse(player1Placement, player1Score, newPosition, newScore, true);
      
      wins.player1Wins += player1Wins * count;
      wins.player2Wins += player2Wins * count;
    }

    return wins;
  }
}

const getSolutionPart1 = (player1Placement, player2Placement) => {
  let rolls = 0;
  let player1Score = 0;
  let player2Score = 0;

  for (let i = 0; i < Infinity; i++) {
    rolls += 3;
    const diceVal = rolls % 100;
    const valueToAdd = (diceVal - 2) + (diceVal - 1) + diceVal;

    if (i % 2 === 0) {
      player1Placement += valueToAdd;
      player1Score += player1Placement % 10 === 0 ? 10 : player1Placement % 10;
      if (player1Score >= 1000) break;
    }

    if (i % 2 !== 0) {
      player2Placement += valueToAdd;
      player2Score += player2Placement % 10 === 0 ? 10 : player2Placement % 10;
      if (player2Score >= 1000) break;
    }
  }

  const loser = player1Score > player2Score ? player2Score : player1Score;
  return loser * rolls;
}

const getSolutionPart2 = (player1Start, player2Start) => {
  const res = enterUniverse(player1Start, 0, player2Start, 0, true);
  return res.player1Wins;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2
};
