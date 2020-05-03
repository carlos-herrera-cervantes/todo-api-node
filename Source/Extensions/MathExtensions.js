'use strict';

const subtractAbsolute = numbers => {
  let result = numbers.reduce((a, b) => a - b);

  return result < 0 ? 0 : result;
}

module.exports = { subtractAbsolute };
