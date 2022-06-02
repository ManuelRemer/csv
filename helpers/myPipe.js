const myPipeReducer = (input, fn) => input.then(fn);

const myPipe =
  (...functions) =>
  (input) =>
    functions.reduce(myPipeReducer, Promise.resolve(input));

module.exports = myPipe;
