const isPrime = (n) => {
  const sqrt = Math.sqrt(n);

  const innerIsPrime = (i) => {
    if (i > sqrt) {
      return n > 1;
    }

    if (n % i === 0) {
      return false;
    }

    return innerIsPrime(i + 1);
  };

  return innerIsPrime(2);
};

const isEven = (num) => num % 2 === 0;

module.exports = {
  isPrime,
  isEven,
};
