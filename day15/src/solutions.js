const { createMinHeap }  = require('./priorityQueue');

const createNode = (x, y) => ({ x, y, key: x + ',' + y });

const getAdjacentNodes = ({ x, y }) => [
  createNode(x, y - 1),
  createNode(x, y + 1),
  createNode(x - 1, y),
  createNode(x + 1, y),
];

const findShortestPath = (riskLevelMap) => {
  const startNode = createNode(0, 0);
  const endNode = createNode(riskLevelMap[0].length - 1, riskLevelMap.length - 1);
  const visited = new Set();
  const childToParent = new Map();

  const riskTracker = riskLevelMap.map(row => row.map(() => Infinity));

  riskTracker[startNode.y][startNode.x] = 0;
  visited.add(startNode.key);

  const heap = createMinHeap();
  heap.push({ priority: 0, node: startNode });

  while (heap.size) {

    const parentNode = heap.pop().node;

    getAdjacentNodes(parentNode).forEach((child) => {
      const childRisk = riskLevelMap[child.y]?.[child.x];
      const parentSumRisk = riskTracker[parentNode.y][parentNode.x];

      if (childRisk) {
        const newRisk = parentSumRisk + childRisk;
        const childSumRisk = riskTracker[child.y][child.x];

        if (newRisk < childSumRisk && !visited.has(child.key)) {
          riskTracker[child.y][child.x] = newRisk;
          childToParent.set(child.key, parentNode);
          heap.push({ priority: newRisk, node: child });
          visited.add(child.key);
        }
      }
    });
    visited.add(parentNode.key);
  }

  const path = [endNode];
  let lastStep = endNode;

  while (lastStep !== startNode) {
    const prev = childToParent.get(lastStep.key);
    path.push(prev);
    lastStep = prev;
  }

  return path.reverse();
}

const getSumOfPath = (grid, path) => {
  return path.reduce((acc, curr) => acc + grid[curr.y][curr.x], 0);
}


const increaseGridRight = (grid) => {
  const height = grid.length;
  const gridWidthToAdd = grid[0].length * 4;

  for (let y = 0; y < height; y++) {
      for (let x = 0; x < gridWidthToAdd; x++) {
          const oldVal = grid[y][x];

          if (oldVal === 9) {
              grid[y].push(1); // right
          } else {
              grid[y].push(oldVal + 1); // right
          }
      }
  }
}

const increaseGridDown = (grid) => {
  const newGridHeight = grid.length * 4;
  const gridWidthToAdd = grid[0].length;

  for (let y = 0; y < newGridHeight; y++) {
      grid.push([]); // new row
      const newRowY = grid.length - 1;

      for (let x = 0; x < gridWidthToAdd; x++) {
          const oldVal = grid[y][x];

          if (oldVal === 9) {
              grid[newRowY].push(1); // down  
          } else {
              grid[newRowY].push(oldVal + 1); // down   
          }
      }
  }
}

const getSolutionPart1 = (grid) => { 
  const firstStep = grid[0][0];
  const path = findShortestPath(grid);
  return getSumOfPath(grid, path) - firstStep;
};

const getSolutionPart2 = (grid) => {
  increaseGridRight(grid)
  increaseGridDown(grid)
  const firstStep = grid[0][0];
  const path = findShortestPath(grid);
  return getSumOfPath(grid, path) - firstStep;
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
