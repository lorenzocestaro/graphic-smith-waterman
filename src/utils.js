const apply = fn => iterable => iterable.map(fn);

const decreaseByOne = number => number - 1;

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const relu = x => Math.max(x, 0);

const reverse = x => -x;

const nanException = () => {
    throw TypeError('Non number input to decreaseAndRectify().');
};

const throwIfNotNumber = x => (Number.isNaN(Number(x)) ? nanException() : x);

module.exports = {
    apply,
    decreaseAndRectify: pipe(
        throwIfNotNumber,
        decreaseByOne,
        relu,
    ),
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
};
