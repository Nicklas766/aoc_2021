const {
  hexToBinary, binaryToDecimal, paddLeadingZeroes, extractHeader, getGroups, getGroupsInDecimal,
} = require('./utils');

describe(('#hexToBinary'), () => {
  it('tests D2FE28', () => {
    expect(hexToBinary('D2FE28')).toEqual('110100101111111000101000');
  });
  it('tests 38006F45291200', () => {
    expect(hexToBinary('38006F45291200')).toEqual('00111000000000000110111101000101001010010001001000000000');
  });
});

describe(('#paddLeadingZeroes'), () => {
  it('should add no left padding when multiple of 4', () => {
    const input = '110100101111111000101000';
    expect(paddLeadingZeroes(input)).toEqual(input);
  });
  it('should add padding when not multiple of 4', () => {
    const input = '111000000000000110111101000101001010010001001000000000';
    const res = '00111000000000000110111101000101001010010001001000000000';
    expect(paddLeadingZeroes(input)).toEqual(res);
  });
});

describe(('#extractHeader'), () => {
  it('should add no left padding when multiple of 4', () => {
    const input = '110100101111111000101000';
    const { version, typeId } = extractHeader(input);

    expect(version).toEqual(6);
    expect(typeId).toEqual(4);
  });
});

describe(('#getGroups'), () => {
  it('return correct groups based on type id 4 length', () => {
    const input = '101111111000101000';
    const { groups, sizeToEat } = getGroups(input);

    expect(groups[0]).toEqual('0111');
    expect(groups[1]).toEqual('1110');
    expect(groups[2]).toEqual('0101');
    expect(sizeToEat).toEqual(15);
  });
});

describe(('#getGroupsInDecimal'), () => {
  it('return the sum in decimal of binary groups', () => {
    const res = getGroupsInDecimal(['0001', '1000', '1010']);
    expect(res).toEqual(binaryToDecimal('000110001010'));
  });
});
