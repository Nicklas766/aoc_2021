const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

describe(('#getSolutionPart1'), () => {
  it('should find increases based on previous number', () => {
    expect(getSolutionPart1([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toEqual(7);
  });
});

describe(('#getSolutionPart2'), () => {
  it('should find increases based on previous sums of three-measurement windows', () => {
    expect(getSolutionPart2([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toEqual(5);
  });
});
