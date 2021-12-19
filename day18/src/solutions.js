const createPartOfPair = (val, depth) => ({ val: Number(val), depth, hasBeenFour: depth === 4 });

const flattenSnailFishNumber = (snailFishNumber) => {
  let depth = -1;

  return snailFishNumber.split('').reduce((flatPairs, char) => {
    if (char === '[') {
      depth++;
      return flatPairs;
    }

    if (char === ']') {
      depth--;
      return flatPairs;
    }

    if (char === ',') {
      return flatPairs;
    }
   
    flatPairs.push(createPartOfPair(char, depth));
    return flatPairs;
  }, []);
}

const getUpdatedFlatPairsAfterExplosion = (pairs) => {
  let hasAddedExplodedPair = false;

  return pairs.reduce((acc, { val, depth }) => {
    if (Number.isInteger(val)) {
      acc.push(createPartOfPair(val, depth));
      return acc;
    }

    if (!hasAddedExplodedPair) {
      acc.push(createPartOfPair(0, depth));
      hasAddedExplodedPair = true;
    }

    return acc;
  },[]);
}

const mergeNumber = (self, other) => {
  if (other) {
    other.val += self.val;
  }

  self.depth = 3;
  self.val = null;
}

const explode = (pairs) => {
  let leftPartHasExploded = false;
  let rightPartHasExploded = false;

  pairs.forEach((part, i) => {
    const prevPart = pairs[i - 1];
    const nextPart = pairs[i + 1];
    const isRightPart = part.depth === 4 && (prevPart?.depth === 4 || prevPart?.hasBeenFour);
    const isLeftPart = part.depth === 4 && (nextPart?.depth === 4 || nextPart?.hasBeenFour);

    if (leftPartHasExploded && rightPartHasExploded) return;

    if (isLeftPart && !leftPartHasExploded) {
      leftPartHasExploded = true;
      mergeNumber(part, prevPart);
      return;
    }

    if (isRightPart) {
      rightPartHasExploded = true;
      mergeNumber(part, nextPart);
      return;
    }
  });

  return {
    newPairs: getUpdatedFlatPairsAfterExplosion(pairs),
    exploded: leftPartHasExploded && rightPartHasExploded,
  }
}

const split = (pairs) => {
  let hasSplit = false;

  pairs.forEach((part) => {
    if (hasSplit) return;

    if (part.val >= 10) {
      part.val1 = Math.floor(part.val / 2);
      part.val2 = Math.ceil(part.val / 2);
      part.depth++;
      part.split = true;
      hasSplit = true;
    }
  })

  const newPairs = pairs.reduce((acc, { val, val1, val2, depth, split }) => {
      if (split) {
        acc.push(createPartOfPair(val1, depth));
        acc.push(createPartOfPair(val2, depth));
        return acc;
      } 
    
      acc.push(createPartOfPair(val, depth));
      return acc;
  },[]);

  return {
    newPairs,
    hasSplit,
  }
}

const add = (flatPairs, flatPairs2) => {
  const newFlatPairs = structuredClone(flatPairs);
  const newFlatPairs2 = structuredClone(flatPairs2);

  newFlatPairs.forEach((part => {
    part.depth += 1;
    if (part.depth === 4) {
      part.hasBeenFour = true;
    }
  }));

  newFlatPairs2.forEach((part => {
    part.depth += 1;
    if (part.depth === 4) {
      part.hasBeenFour = true;
    }
  }));

  return newFlatPairs.concat(newFlatPairs2);
}

const reducePairs = (flatPairs) => {
  const { newPairs, exploded } = explode(flatPairs);
  if (exploded) {
    return reducePairs(newPairs);
  }

  const { newPairs: newPairs2, hasSplit } = split(newPairs);
  if (hasSplit) {
    return reducePairs(newPairs2);
  }

  return newPairs2;
}

const calculateArrayOfFlatPairs = (arrayOfFlatPairs) => 
  arrayOfFlatPairs.reduce((prevFlatPairs, currFlatPairs) => 
    reducePairs(add(prevFlatPairs, currFlatPairs)));


const getMagnitude = (val1, val2) => 3 * val1 + 2 * val2;

const calculateMagnitude = (flatPairs) => {
  const innerCalculcate = (reducedFlatPairs) => {
    let lastFoundPart = null;
    let reducedByOne = [];

    reducedFlatPairs.forEach((left, i) => {
      const right = reducedFlatPairs[i + 1];
      const rightAlreadyAdded = lastFoundPart === left;
      const isPair = left?.depth === right?.depth;
  
      if (isPair && !rightAlreadyAdded) {
        lastFoundPart = right;
        const newVal = getMagnitude(left.val, right.val);
        reducedByOne.push(createPartOfPair(newVal, left.depth - 1));
        return;
      }
      
      if (!rightAlreadyAdded) {
        lastFoundPart = left;
        reducedByOne.push(createPartOfPair(left.val, left.depth));
      }
    });

    for (let i = 0; i < reducedByOne.length; i++) {
      const pairFound = reducedByOne[i]?.depth === reducedByOne[i + 1]?.depth;

      if (pairFound) {
        return innerCalculcate(reducedByOne);
      }
    }
  
    return reducedByOne.reduce((acc, curr) => acc + curr.val, 0);
  }

  return innerCalculcate(flatPairs);
}

const findLargestSumOfTwoNumbers = (arrayOfFlatPairs) => {
  const getCombinations = (combinations, pair1) => {
    arrayOfFlatPairs.forEach((pair2) => {
      if (pair1 !== pair2) {
        combinations.push({ pair1, pair2 });
      }
    });
    return combinations;
  }

  const addTogether = (acc, { pair1, pair2 }) => {
    acc.push(reducePairs(add(pair1, pair2)));
    return acc;
  };

  const getHighestMagnitude = (highestSum, pairs) => {
    const magnitude = calculateMagnitude(pairs);
    return highestSum > magnitude ? highestSum : magnitude;
  }

  return arrayOfFlatPairs
  .reduce(getCombinations, [])
  .reduce(addTogether, [])
  .reduce(getHighestMagnitude, 0);
};

const getSolutionPart1 = (input) => {
  const flatPairs = input.map(flattenSnailFishNumber);
  const sum = calculateArrayOfFlatPairs(flatPairs);
  return calculateMagnitude(sum);
}

const getSolutionPart2 = (input) => {
  const flatPairs = input.map(flattenSnailFishNumber);
  return findLargestSumOfTwoNumbers(flatPairs);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2
};
