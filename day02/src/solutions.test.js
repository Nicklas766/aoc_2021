const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

const input = [['forward', 5], ['down', 5], ['forward', 8], ['up', 3], ['down', 8], ['forward', 2]];

describe(('#getSolutionPart1'), () => {
  it('should return the value provided by AOC', () => {
    expect(getSolutionPart1(input)).toEqual(150);
  });
});

describe(('#getSolutionPart2'), () => {
  it('should return the value provided by AOC', () => {
    expect(getSolutionPart2(input)).toEqual(900);
  });
});
