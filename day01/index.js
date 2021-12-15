const fs = require('fs');
const { isPrime, isEven } = require('./utils');

const getInputData = (fileName = 'input.txt') => fs
.readFileSync(fileName)
.toString()
.split('\n')
.map(Number);

const getSolutionPart1 = () => getInputData()
.reduce((acc, num, i) => isPrime(num) ? acc + (num * i) : acc);

const getSolutionPart2 = () => getInputData().reduce((acc, num, i) => {
    if (isPrime(num)) {
        return acc;
    }

    return isEven(i) ?  acc + num : acc - num;
});

const part = process.env.part || "part1";

if (part === "part1") {
    console.log(getSolutionPart1());
}

if (part === "part2") {
    console.log(getSolutionPart2());
}