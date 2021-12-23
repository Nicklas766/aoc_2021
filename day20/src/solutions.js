const LIGHT_PIXEL = '#';
const DARK_PIXEL = '.';

const toDecimal = (binaryNumber) => parseInt(binaryNumber, 2);

const toBinary = (pixelStr) => {
  return pixelStr.split('').reduce((acc, char) => {
    if (char === DARK_PIXEL) {
      return acc + '0';
    }

    if (char === LIGHT_PIXEL) {
      return acc + '1';
    }

    return acc;
  }, '');
}

const getGridRows = (x, y, grid) => {
  const row1 = grid[y][x] + grid[y][x + 1] + grid[y][x + 2];
  const row2 = grid[y + 1][x] + grid[y + 1][x + 1] + grid[y + 1][x + 2];
  const row3 = grid[y + 2][x] + grid[y + 2][x + 1] + grid[y + 2][x + 2];

  return row1 + row2 + row3;
}

const updateMiddle = (x, y, pixelType, newGrid) => {
  newGrid[y + 1][x + 1] = pixelType;
}

const enhanceImg = (img, algorithm, currentExtendedPixelType) => {
  const getByIndex = (x, y, grid) => {
    if (grid[y]?.[x]) {
      return grid[y][x];
    }

    return currentExtendedPixelType;
  }

  const OLD_Y_MAX = img.length;
  const OLD_X_MAX = img[0].length;

  const extendedImg = Array.from({ length: OLD_Y_MAX + 4 }, (_, y) => Array.from({ length: OLD_X_MAX + 4 }, (_, x) => getByIndex(x - 2, y - 2, img)));
  const newImg = Array.from({ length: OLD_Y_MAX + 4 }, (_, y) => Array.from({ length: OLD_X_MAX + 4 }, (_, x) => extendedImg[y][x]));

  for (let y = 0; y < extendedImg.length - 2; y++) {
    for (let x = 0; x < extendedImg[0].length - 2; x++) {
      const index = toDecimal(toBinary(getGridRows(x, y, extendedImg)));
      updateMiddle(x, y, algorithm[index], newImg)
    }
  }

  newImg.pop();
  newImg.shift();
  newImg.forEach((row) => {
    row.pop();
    row.shift();
  });

  return newImg;
}


const getSolutionPart1 = (img, algorithm) => {
  const startsWithLight = algorithm[0] === LIGHT_PIXEL;
  const enchancedImg = enhanceImg(img, algorithm, DARK_PIXEL);
  const enchancedImg2 = enhanceImg(enchancedImg, algorithm, startsWithLight ? LIGHT_PIXEL : DARK_PIXEL);

  return enchancedImg2.flat().reduce((acc, curr) => curr === LIGHT_PIXEL ? acc + 1 : acc, 0);
}

const getSolutionPart2 = (img, algorithm) => {
  const startsWithLight = algorithm[0] === LIGHT_PIXEL;

  const enchancedImg = Array
  .from({ length: 50 }, (_, i) => i + 1)
  .reduce((currImg, i) => {
    if (i % 2 === 0) {
      return enhanceImg(currImg, algorithm, startsWithLight ? LIGHT_PIXEL : DARK_PIXEL);
    }
    return enhanceImg(currImg, algorithm, DARK_PIXEL)
  }, img)

  return enchancedImg.flat().reduce((acc, curr) => curr === LIGHT_PIXEL ? acc + 1 : acc, 0);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2
};
