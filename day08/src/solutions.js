const getPatternToValueBasedOnSegments = (segments) => {
  const foundPatternAt = {};
  const unknownPatternsWithLength = {};

  for (obj of segments) {
    const segment = obj.pattern;
    foundPatternAt[1] = segment.length === 2 ? segment.split('') : foundPatternAt[1];
    foundPatternAt[4] = segment.length === 4 ? segment.split('') : foundPatternAt[4];
    foundPatternAt[7] = segment.length === 3 ? segment.split('') : foundPatternAt[7];
    foundPatternAt[8] = segment.length === 7 ? segment.split('') : foundPatternAt[8];
  
    if (segment.length === 6) {
      unknownPatternsWithLength[6] ??= [];
      unknownPatternsWithLength[6].push(segment.split(''));
    }
  
    if (segment.length === 5) {
      unknownPatternsWithLength[5] ??= [];
      unknownPatternsWithLength[5].push(segment.split(''));
    }
  }

  // extract known values
  const c_f = foundPatternAt[1];
  const a_c_f = foundPatternAt[7];
  const b_c_d_f = foundPatternAt[4];
  const a_b_c_d_e_f_g = foundPatternAt[8];

  // use known values to find unknown
  const b_d = b_c_d_f.filter((char) => !c_f.includes(char));
  const a = a_c_f.filter((char) => !c_f.includes(char));
  const c_f_b_d_a = c_f.concat(b_d).concat(a);
  const e_or_g = a_b_c_d_e_f_g.filter((char) => !c_f_b_d_a.includes(char));

  // prepare to find g and f
  const a_b_d_e_g = e_or_g.concat(b_d).concat(a);
  const a_b_c_d_f = b_d.concat(a).concat(c_f);
  let g, f;
  for (x of unknownPatternsWithLength[6]) {  
    const foundG = x.filter(char => !a_b_c_d_f.includes(char));
    const foundF = x.filter(char => !a_b_d_e_g.includes(char));
    
    if (foundG.length === 1) {
      g = foundG;
    }
  
    if (foundF.length === 1) {
      f = foundF;
    }
  }

  // prepare to find d
  let d;
  const c = c_f.filter((char) => !f.includes(char));
  const e = e_or_g.filter((char) => !g.includes(char));
  const a_c_e_g = a.concat(c).concat(e).concat(g);
  
  for (x of unknownPatternsWithLength[5]) {
    const foundD = x.filter(char => !a_c_e_g.includes(char));
  
    if (foundD.length === 1) {
      d = foundD;
    }
  }
  
  const b = b_d.filter((char) => !d.includes(char))

  const zeroPattern = [a, b, c, e, f, g].flat().sort().join('');
  const onePattern = [c, f].flat().sort().join('');
  const secondPattern = [a, c, d, e, g].flat().sort().join('');
  const thirdPattern = [a, c, d, f, g].flat().sort().join('');
  const fourthPattern = [b, c, d, f].flat().sort().join('');
  const fifthPattern = [a, b, d, f, g].flat().sort().join('');
  const sixthPattern = [a, b, d, e, f, g].flat().sort().join('');
  const seventhPattern = [a, c, f].flat().sort().join('');
  const eightthPattern = [a, b, c, d, e, f, g].flat().sort().join('');
  const ninthPattern = [a, b, c, d, f, g].flat().sort().join('');

  return {
    [zeroPattern]: 0,
    [onePattern]: 1,
    [secondPattern]: 2,
    [thirdPattern]: 3,
    [fourthPattern]: 4,
    [fifthPattern]: 5,
    [sixthPattern]: 6,
    [seventhPattern]: 7,
    [eightthPattern]: 8,
    [ninthPattern]: 9
  }
}

const getSolutionPart1 = (lines) => {
  let instances = 0;

  lines.forEach((line) => {
    const fourDigits = line.slice(line.length-4)
    for (obj of fourDigits) {
      const digit = obj.pattern;

      if ([2, 4, 3, 7].includes(digit.length)) {
        instances += 1;
      }
    }
  });

  return instances;
}

// Note: there's much better ways to do this, my initial solution, might improve later
const getSolutionPart2 = (lines) => {
  let total = 0;

  lines.forEach((line) => {
    let stringNum = '';
    const segments = line.slice(0, line.length - 4);
    const fourDigits = line.slice(line.length - 4);

    const patternToValue = getPatternToValueBasedOnSegments(segments);

    for (digit of fourDigits) {
      stringNum += patternToValue[digit.sorted];
    }

    total += Number(stringNum);
    stringNum = '';
  });

  return total;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
