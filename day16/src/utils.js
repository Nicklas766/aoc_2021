const binaryToDecimal = (binaryNumber) => parseInt(binaryNumber, 2);

const hexToBinary = (hex) => {
  // Saving lines for analyser (would never do this otherwise..)
  const keyToBinary = {
    0: '0000', 1: '0001', 2: '0010', 3: '0011', 4: '0100', 5: '0101', 6: '0110', 7: '0111', 8: '1000', 9: '1001', A: '1010', B: '1011', C: '1100', D: '1101', E: '1110', F: '1111',
  };
  return hex.split('').reduce((str, curr) => str + keyToBinary[curr], '');
};

const isMultipleOfFour = (num) => num % 4 === 0;
const paddLeadingZeroes = (binaryNumber) => {
  let leadingZeroes = '';

  while (!isMultipleOfFour(binaryNumber.length + leadingZeroes.length)) {
    leadingZeroes += '0';
  }

  return leadingZeroes + binaryNumber;
};

const extractHeader = (binaryNumber) => {
  const version = binaryToDecimal(binaryNumber.slice(0, 3));
  const typeId = binaryToDecimal(binaryNumber.slice(3, 6));
  return { version, typeId };
};

const getGroups = (binaryNumber) => {
  const binaryDigits = binaryNumber.split('');
  const groupSize = 5;
  const groups = [];

  const thereAreMoreGroups = (remainingDigits) => remainingDigits.length >= groupSize;

  while (thereAreMoreGroups(binaryDigits)) {
    const foundGroup = binaryDigits.splice(0, 5).join('');

    if (foundGroup[0] === '0') {
      groups.push(foundGroup.slice(1));
      break;
    }

    groups.push(foundGroup.slice(1));
  }

  return {
    groups,
    sizeToEat: groups.length * 5,
  };
};

const getGroupsInDecimal = (groups) => binaryToDecimal(groups.join(''));

module.exports = {
  hexToBinary,
  paddLeadingZeroes,
  extractHeader,
  getGroups,
  getGroupsInDecimal,
  binaryToDecimal,
};
