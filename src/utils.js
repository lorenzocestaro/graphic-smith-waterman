const apply = fn => (iterable) => iterable.map(fn);

const decreaseByOne = number => number - 1;

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const relu = x => Math.max(x, 0)

module.exports = {
    apply,
    decreaseAndRectify: pipe(decreaseByOne, relu),
};
