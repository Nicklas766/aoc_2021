const getLanternfishSpawnAmountAfterDays = (n, inputArray) => {
  const spawnDaysToAmount = { ...Array.from({ length: 8 + 1 }, () => 0) };
  inputArray.forEach((numOfDays) => spawnDaysToAmount[numOfDays] += 1);

  for (let i = 0; i < n; i++) {
    const readyToSpawnAmount = spawnDaysToAmount[0];
  
    for (let t = 0; t <= 8; t++) {
      spawnDaysToAmount[t] = spawnDaysToAmount[t + 1];
    }
  
    spawnDaysToAmount[6] += readyToSpawnAmount;
    spawnDaysToAmount[8] = readyToSpawnAmount;
  }

  return Object.values(spawnDaysToAmount).reduce((acc, curr) => acc + curr);
}

module.exports = {
  getSolutionPart1: (input) => getLanternfishSpawnAmountAfterDays(80, input),
  getSolutionPart2: (input) => getLanternfishSpawnAmountAfterDays(256, input),
};
