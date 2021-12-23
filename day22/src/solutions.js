const createCuboid = (on, x0, x1, y0, y1, z0, z1) => ({
  on,
  x0, x1, y0, y1, z0, z1
});

const extractCuboid = (line) => {
  const on = line.includes('on');
  const splitted = line.split(',');
  const x = splitted[0].split('x=')[1].split('..').map(Number);
  const y = splitted[1].split('y=')[1].split('..').map(Number);
  const z = splitted[2].split('z=')[1].split('..').map(Number);

  // add 1 so we get all combinations
  return createCuboid(on, x[0], x[1] + 1, y[0], y[1] + 1, z[0], z[1] + 1);
}

const isEmpty = (c) => {
  const emptyX = c.x0 - c.x1 === 0;
  const emptyY = c.y0 - c.y1 === 0;
  const emptyZ = c.z0 - c.z1 === 0;

  return emptyX || emptyY || emptyZ;
}

const intersects = (a, b) => {
  if (!((a.x0 < b.x1) && (a.x1 > b.x0))) return false;
  if (!((a.y0 < b.y1) && (a.y1 > b.y0))) return false;
  if (!((a.z0 < b.z1) && (a.z1 > b.z0))) return false;

  return true;
}

// B ⊆ A
const contains = (a, b) => {
  if (!((a.x0 <= b.x0) && (a.x1 >= b.x1))) return false;
  if (!((a.y0 <= b.y0) && (a.y1 >= b.y1))) return false;
  if (!((a.z0 <= b.z0) && (a.z1 >= b.z1))) return false;

  return true;
}

// A - B
const getDifferences = (a, b) => {
  const xs = [a.x0, a.x1, b.x0, b.x1].sort((a, b) => a - b); 
  const ys = [a.y0, a.y1, b.y0, b.y1].sort((a, b) => a - b);
  const zs = [a.z0, a.z1, b.z0, b.z1].sort((a, b) => a - b);
  const fromX = xs.slice(0, 3);
  const fromY = ys.slice(0, 3);
  const fromZ = zs.slice(0, 3);
  const toX = xs.slice(1);
  const toY = ys.slice(1);
  const toZ = zs.slice(1);

  return fromX.reduce((aMinusB, _, x) => {
    fromY.forEach((_, y) => {
      fromZ.forEach((_, z) => {
        const cuboid = createCuboid(true, fromX[x], toX[x], fromY[y], toY[y], fromZ[z], toZ[z]);

        if (isEmpty(cuboid)) {
          return;
        }

        if (intersects(cuboid, b)) {
          return;
        }

        if (contains(a, cuboid)) { // only save A parts excluding B
          aMinusB.push(cuboid);
        }
      });
    });

    return aMinusB;
  }, []);
}

const getCombinations = (c) => {
  const xDist = c.x1 - c.x0;
  const yDist = c.y1 - c.y0;
  const zDist = c.z1 - c.z0;

  return xDist * yDist * zDist;
}

const getStateAfterReboot = (cuboids) => {
  return cuboids.reduce((prevCuboids, curr) => {

    const cuboidsToKeep = [];

    prevCuboids.forEach((prev) => {
      // if intersects then we need to split or dismiss
      if (intersects(prev, curr)) {

        // if new contains entire prev, then do not re-add prev
        if (!contains(curr, prev)) {
           // keep all parts of "prev" that do not intersect
          const prevMinusCurr = getDifferences(prev, curr);
          cuboidsToKeep.push(...prevMinusCurr);
        }

        return;
      } 
        
      cuboidsToKeep.push(prev); // keep it if no intersection
    })

    if (curr.on) {
      cuboidsToKeep.push(curr);
    }

    return cuboidsToKeep;
  }, []);
}


const getSolutionPart1 = (input) => { 
  const cuboids = input.map(extractCuboid).filter((c) => {
    const okLow = [c.x0, c.y0, c.z0].filter(v => v >= -50).length === 3;
    const okHigh = [c.x1, c.y1, c.z1].filter(v => v -1 <= 50).length === 3;

    return okLow && okHigh;
  });

  return getStateAfterReboot(cuboids).reduce((acc, c) => acc + getCombinations(c), 0);
};

const getSolutionPart2 = (input) => {
  const cuboids = input.map(extractCuboid);
  return getStateAfterReboot(cuboids).reduce((acc, c) => acc + getCombinations(c), 0);
};

module.exports = { getSolutionPart1, getSolutionPart2 };
