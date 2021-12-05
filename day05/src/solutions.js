const tryToDoVertical = (diagram, [x1, y1, x2, y2]) => {
  const isVertical = x1 === x2;

  if (isVertical) {
    const x = x1 || x2;
    const yStart = y1 < y2 ? y1 : y2;
    const stepsToGoVertically = Math.abs(y1 - y2);
    for (let i = 0; i <= stepsToGoVertically; i++) {
      diagram[yStart + i][x] += 1;
    }
    return true;
  }
  return false;
};

const tryToDoHorizontal = (diagram, [x1, y1, x2, y2]) => {
  const isHorizontal = y1 === y2;

  if (isHorizontal) {
    const y = y1 || y2;
    const xStart = x1 < x2 ? x1 : x2;
    const stepsToGoHoriziontally = Math.abs(x1 - x2);
    for (let i = 0; i <= stepsToGoHoriziontally; i++) {
      diagram[y][xStart + i] += 1;
    }
    return true;
  }
  return false;
};

const doDiagonal = (diagram, [x1, y1, x2, y2]) => {
  const x = x1 < x2 ? x1 : x2;
  const y = x1 < x2 ? y1 : y2;
  const newY2 = x1 < x2 ? y2 : y1;
  const stepsToGo = Math.abs(x1 - x2);

  if (y > newY2) {
    for (let i = 0; i <= stepsToGo; i++) {
      diagram[y - i][x + i] += 1;
    }
  }

  if (y < newY2) {
    for (let i = 0; i <= stepsToGo; i++) {
      diagram[y + i][x + i] += 1;
    }
  }
};

const getDiagram = (coords) => {
  const maxX = Math.max(...coords.map(([x1, _, x2]) => (x1 > x2 ? x1 : x1)));
  const maxY = Math.max(...coords.map(([_, y1, _2, y2]) => (y1 > y2 ? y1 : y2)));
  const diagram = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => 0));
  return diagram;
};

const getSolutionPart1 = (coords) => {
  const diagram = getDiagram(coords);

  coords.forEach((coord) => {
    if (tryToDoVertical(diagram, coord)) return;
    if (tryToDoHorizontal(diagram, coord)) return;
  });

  const breaks = diagram.flat().reduce((acc, point) => (point >= 2 ? acc + 1 : acc), 0);
  return breaks;
};

const getSolutionPart2 = (coords) => {
  const diagram = getDiagram(coords);

  coords.forEach((coord) => {
    if (tryToDoVertical(diagram, coord)) return;
    if (tryToDoHorizontal(diagram, coord)) return;
    doDiagonal(diagram, coord);
  });

  const breaks = diagram.flat().reduce((acc, point) => (point >= 2 ? acc + 1 : acc), 0);
  return breaks;
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
