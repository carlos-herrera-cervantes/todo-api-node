'use strict';

const subtractAbsolute = numbers => {
  const result = numbers.reduce((a, b) => a - b);

  return result < 0 ? 0 : result;
}

module.exports = { subtractAbsolute };
