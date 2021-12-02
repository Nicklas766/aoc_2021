const getSolutionPart1 = (input) => {
  const result = input.reduce((state, [command, num]) => {
    if (command === 'forward') {
      return {
        ...state,
        horizontal: num + state.horizontal,
      };
    }

    if (command === 'down') {
      return {
        ...state,
        depth: state.depth + num,
      };
    }

    if (command === 'up') {
      return {
        ...state,
        depth: Math.max(0, state.depth - Number(num)),
      };
    }

    return state;
  }, { depth: 0, horizontal: 0 });

  return result.depth * result.horizontal;
};

const getSolutionPart2 = (input) => { 
  const result = input.reduce((state, [command, num]) => {
    if (command === 'forward') {
      return {
        ...state,
        depth: state.depth + state.aim * num,
        horizontal: num + state.horizontal,
      };
    }

    if (command === 'down') {
      return {
        ...state,
        aim: state.aim + num,
      };
    }

    if (command === 'up') {
      return {
        ...state,
        aim: state.aim - num,
      };
    }

    return state;
  }, { depth: 0, horizontal: 0, aim: 0 });

  return result.depth * result.horizontal;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
