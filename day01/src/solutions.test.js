const { getSolutionPart1, getSolutionPart2 } = require('./solutions');

describe(('#getSolutionPart1'), () => {
  it('3x1 + 107x5 + 269x7 = 2421', () => {
    expect(getSolutionPart1([0, 3, 4, 42, 106, 107, 267, 269])).toEqual(2421);
  });
});

describe(('#getSolutionPart2'), () => {
  it('0 + 4 - 42 + 106 + 267 = 335', () => {
    expect(getSolutionPart2([0, 3, 4, 42, 106, 107, 267, 269])).toEqual(335);
  });
});
