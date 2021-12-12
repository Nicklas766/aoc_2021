const openChars = new Set(['(', '[', '{', '<']);
const closedChars = new Set([')', ']', '}', '>']);
const openToClosed = {
  '(': ')', 
  '[': ']',
  '{': '}',
  '<': '>',
};
const closeCharToNumber = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const getIllegalForLine = (line) => {
  const foundOpenChars = [];

  for (let char of line) {
    if (openChars.has(char)) {
      foundOpenChars.push(char);
    }

    if (closedChars.has(char)) {
      const openChar = foundOpenChars.pop();

      if (openToClosed[openChar] !== char) {
        return char;
      }
    }
  }
}

const getEndingForLine = (line) => {
  const foundOpenChars = [];

  for (let char of line) {
    if (openChars.has(char)) {
      foundOpenChars.push(char);
    }

    if (closedChars.has(char)) {
      foundOpenChars.pop();
    }
  }

  return foundOpenChars.map(char => openToClosed[char]).reverse();
}

const getSolutionPart1 = (lines) => {
  const foundIllegalChars = [];

  for (let line of lines) {
    const illegalChar = getIllegalForLine(line); 

    if (illegalChar) {
      foundIllegalChars.push(illegalChar);
    }
  }

  return foundIllegalChars.map(num => closeCharToNumber[num]).reduce((prev, curr) => prev + curr);
}

const getSolutionPart2 = (lines) => {
  const endingPoints = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  const points = [];

  for (let line of lines) {
    const illegalChar = getIllegalForLine(line);
    
    if (!illegalChar) {
      let total = 0;
      const ending = getEndingForLine(line);
     
      for (let close of ending) {
        total *= 5;
        total += endingPoints[close];
      }

      points.push(total);
    }
  }

  const p = points.sort((a, b) => a - b);
  return p[Math.floor(p.length / 2)];
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
