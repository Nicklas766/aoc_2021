const getOccurencesAtPosition = (binaryNumbers, pos) => binaryNumbers.reduce((occurences, binaryNumber) => {
  if (binaryNumber[pos] === '0') {
    return { 
      zero: occurences.zero + 1,
      one: occurences.one
    };
  }

  return { 
    zero: occurences.zero,
    one: occurences.one + 1
  };
}, { zero: 0, one: 0 });

const getRatingByCriteria = (binaryNumbers, reduceNumbersByCriteria, pos = 0) => {
  if (binaryNumbers.length === 1) {
    return binaryNumbers;
  }

  const occurences = getOccurencesAtPosition(binaryNumbers, pos);
  const keptBinaryNumbers = reduceNumbersByCriteria(binaryNumbers, occurences, pos);

  return getRatingByCriteria(keptBinaryNumbers, reduceNumbersByCriteria, pos + 1);   
}

const co2Criteria = (numbers, occurences, pos) => {
  if (occurences.one > occurences.zero) {
    return numbers.filter((num) => num[pos] === '0');
  }

  if (occurences.one < occurences.zero) {
    return numbers.filter((num) => num[pos] === '1');
  }

  return numbers.filter((num) => num[pos] === '0');
}

const oxygenCriteria = (numbers, occurences, pos) => {
  if (occurences.one > occurences.zero) {
    return numbers.filter((num) => num[pos] === '1');
  }

  if (occurences.one < occurences.zero) { 
    return numbers.filter((num) => num[pos] === '0')
  }

  return numbers.filter((num) => num[pos] === '1');
};

const getSolutionPart1 = (binaryNumbers) => {
  const numOfDigits = binaryNumbers[0].length;
  let common = "", leastCommon = "";

  for (let i = 0; i < numOfDigits; i++) {
    const { one, zero } = getOccurencesAtPosition(binaryNumbers, i);

    if (one > zero) {
      common += '1'
      leastCommon += '0'
    } else {
      common += '0'
      leastCommon += '1'
    }
  }

  return parseInt(common, 2) * parseInt(leastCommon, 2);
};

const getSolutionPart2 = (binaryNumbers) => { 
  const co2RatingInBinary = getRatingByCriteria(binaryNumbers, co2Criteria);
  const oxygenRatingInBinary = getRatingByCriteria(binaryNumbers, oxygenCriteria);

  return parseInt(co2RatingInBinary, 2) * parseInt(oxygenRatingInBinary, 2);
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};