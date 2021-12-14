const getPairsFromTemplate = (template) => {
  const startingPairs = {};

  for (let i = 1; i < template.length; i++) {
    const pair = template[i - 1] + template[i];
    startingPairs[pair] ??= 0;
    startingPairs[pair] += 1;
  }

  return startingPairs;
}

const getPairCount = (startingPairs, pairToLetter, steps) => {
  const stepsArr = Array.from({ length: steps }, (_, i) => i);

  return stepsArr.reduce((pairs) => {
    return Object.entries(pairs).reduce((innerPairs, [pair, amount]) => {
      const possibleFoundLetter = pairToLetter[pair];

      if (possibleFoundLetter) {
        innerPairs[pair[0] + possibleFoundLetter] ??= 0;
        innerPairs[pair[0] + possibleFoundLetter] += amount;
        innerPairs[possibleFoundLetter + pair[1]] ??= 0;
        innerPairs[possibleFoundLetter + pair[1]] += amount;
        innerPairs[pair] -= amount;
      } else {
        innerPairs[pair] += amount;
      }

      return innerPairs;
    }, pairs);
    
  }, startingPairs);
}

const getCharCount = (pairCount, template) => {
  const keyToAddOneTo = template[template.length - 1]; // the logic below misses the last char in template

  const charCount = Object.entries(pairCount).reduce((charCount, [pair, amount]) => {
    const char = pair[0];
    return {
      ...charCount,
      [char]: charCount[char] ? charCount[char] + amount : amount,
    }
  }, {});

  charCount[keyToAddOneTo] += 1;
  return charCount;
}

const getMaxAndMinFromCharCount = (charCount) => {
  const integers = Object.values(charCount);
  return {
    max: Math.max(...integers),
    min: Math.min(...integers),
  }
}

const getSolutionPart1 = (template, pairToLetter) => { 
  const startingPairs = getPairsFromTemplate(template);
  const pairCount = getPairCount(startingPairs, pairToLetter, 10);
  const charCount = getCharCount(pairCount, template);
  const { max, min } = getMaxAndMinFromCharCount(charCount);
  return max - min;
};

const getSolutionPart2 = (template, pairToLetter) => { 
  const startingPairs = getPairsFromTemplate(template);
  const pairCount = getPairCount(startingPairs, pairToLetter, 40);
  const charCount = getCharCount(pairCount, template);
  const { max, min } = getMaxAndMinFromCharCount(charCount);
  return max - min;
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
