const { isPrime, isEven } = require('./utils');

describe(('#isPrime'), () => {
  it('should return false when 1', () => expect(isPrime(1)).toEqual(false));

  it('should return true when 2', () => expect(isPrime(2)).toEqual(true));

  it('should return false when 4', () => expect(isPrime(4)).toEqual(false));

  it('should return false when 9', () => expect(isPrime(9)).toEqual(false));

  it('should test range 0-100', () => {
    const knownPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    const numbers = Array.from({ length: 101 }, (_, i) => i);
    const filteredNumbers = numbers.filter(isPrime);

    expect(filteredNumbers).toMatchObject(knownPrimes);
  });
});

describe(('#isEven'), () => {
  it('should return true when even', () => expect(isEven(2)).toEqual(true));

  it('should return true when odd', () => expect(isEven(1)).toEqual(false));

  it('should return true when 0', () => expect(isEven(0)).toEqual(true));
});
