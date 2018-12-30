const { apply, decreaseAndRectify } = require('./utils');

const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    UP: 3,
});

const coordinateUpdaters = direction => {
    const getters = {
        [directions.DIAGONAL]: apply(decreaseAndRectify),
        [directions.LEFT]: ([row, col]) => [row, decreaseAndRectify(col)],
        [directions.UP]: ([row, col]) => [decreaseAndRectify(row), col],
        [directions.NONE]: apply(decreaseAndRectify),
    };
    return getters[direction];
};

const getDiagonalChars = ({ seq1, seq2, row, col }) => [
    seq1[row-1] || '-',
    seq2[col-1] || '-',
]

const alignmentUpdaters = direction => {
    const updaters = {
        [directions.DIAGONAL]: getDiagonalChars,
        [directions.LEFT]: ({ seq2, col }) => ['-', seq2[col-1]],
        [directions.UP]: ({ seq1, row }) => [seq1[row-1], '-'],
        [directions.NONE]: getDiagonalChars,
    };
    return updaters[direction];
};

function getTracebackDirection({ currentScore, mutationScore, insertionScore, deletionScore }) {
    if (currentScore < 0) {
        return directions.NONE;
    }

    // TODO
    // Maybe refactor: Mutation has priority and needs to be the last element
    // of the dictionary to overwrite deletion/insertion if the score is the
    // same.
    const directionSwitch = {
        [deletionScore]: directions.UP,
        [insertionScore]: directions.LEFT,
        [mutationScore]: directions.DIAGONAL,
    };

    return directionSwitch[currentScore] || 0;
}

function align({ sequence1, sequence2, tracebackMatrix }) {
    let row = sequence1.length;
    let col = sequence2.length;
    const aligned1 = [];
    const aligned2 = [];
    while (row > 0 || col > 0) {
        const direction = tracebackMatrix[row][col];
        const alignmentUpdater = alignmentUpdaters(direction);
        const [char1, char2] = alignmentUpdater({ seq1: sequence1, seq2: sequence2, row, col });
        aligned1.unshift(char1)
        aligned2.unshift(char2)
        const coordinateUpdater = coordinateUpdaters(direction);
        [row, col] = coordinateUpdater([row, col]);
    }
    return `${aligned1.join('')}\n${aligned2.join('')}`;
}

module.exports = {
    align,
    getTracebackDirection,
};
