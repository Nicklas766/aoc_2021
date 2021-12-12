const createVertex = (key) => {
  const adjancencyList = [];

  const connect = (vertex) => {
    adjancencyList.push(vertex);
  }

  return { 
    key,
    small: key === key.toLowerCase(),
    connect,
    adjancencyList,
  };
}

const createGraph = () => {
  const vertices = new Map();

  const add = (key) => {
    if (!vertices.has(key)) {
      vertices.set(key, createVertex(key));
    }
  }

  const connectVertices = ({ from, to }) => {
    vertices.get(from).connect(to);
    vertices.get(to).connect(from);
  }

  const getUniquePathsAmount = (start, end, onlyAllowOneSmallCave) => {
    let foundPaths = 0;
    
    const findPaths = (currVertex, destVertex, visited, canVisitSimilarSmallCaveAgain) => {
      const vertex = vertices.get(currVertex);
      const allowedToVisitSimilarSmallCaveAgain = canVisitSimilarSmallCaveAgain || (visited.has(currVertex) && vertex.small);
      visited.add(currVertex);

      if (currVertex === destVertex) {
        foundPaths += 1;
      }

      if (vertex.key === 'end') {
        return;
      }

      vertex.adjancencyList.forEach((neighbour) => {
        const neighbourVertex = vertices.get(neighbour);
        const neighbourIsUpperCase = !neighbourVertex.small;
        const neighbourIsLowerCase = neighbourVertex.small;
        
        const isNotStartOrEnd = neighbour !== 'start' && neighbour !== 'end'; 
        const canVisitSmallCaveAgain = neighbourIsLowerCase && isNotStartOrEnd && !allowedToVisitSimilarSmallCaveAgain;
  
        if (neighbourIsUpperCase || canVisitSmallCaveAgain || !visited.has(neighbour)) {
          findPaths(neighbour, destVertex, new Set(visited), allowedToVisitSimilarSmallCaveAgain);
        }
      });
    }

    findPaths(start, end, new Set(), onlyAllowOneSmallCave);
    return foundPaths;
    
  };
  return { connectVertices, getUniquePathsAmount, add }
}
  
const getPreparedGraph = (input) => {
  const graph = createGraph();

  for (let fromTo of input) {
    graph.add(fromTo.from);
    graph.add(fromTo.to);
    graph.connectVertices(fromTo);
  }

  return graph;
}

const getSolutionPart1 = (input) => {
  const graph = getPreparedGraph(input);
  return graph.getUniquePathsAmount('start', 'end', true);
}

const getSolutionPart2 = (input) => {
  const graph = getPreparedGraph(input);
  return graph.getUniquePathsAmount('start', 'end', false);
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
