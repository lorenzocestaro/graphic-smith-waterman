const decreaseByOne = number => number - 1;

const decreaseAllByOne = (...numbers) => numbers.map(decreaseByOne);

module.exports = {
    decreaseAllByOne,
    decreaseByOne,
};
