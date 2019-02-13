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

const getDiagonalChars = gapSymbol => ({ seq1, seq2, row, col }) => [
    seq1[row - 1] || gapSymbol,
    seq2[col - 1] || gapSymbol,
];

const alignmentUpdaters = gapSymbol => direction => {
    const updaters = {
        [directions.DIAGONAL]: getDiagonalChars(gapSymbol),
        [directions.LEFT]: ({ seq2, col }) => [gapSymbol, seq2[col - 1]],
        [directions.UP]: ({ seq1, row }) => [seq1[row - 1], gapSymbol],
        [directions.NONE]: getDiagonalChars(gapSymbol),
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

function align({ sequence1, sequence2, tracebackMatrix, gapSymbol }) {
    let row = sequence1.length;
    let col = sequence2.length;
    const aligned1 = [];
    const aligned2 = [];
    const coordinateWalk = [[row, col]];
    const updaters = alignmentUpdaters(gapSymbol);
    while (row > 0 || col > 0) {
        const direction = tracebackMatrix[row][col];
        const alignmentUpdater = updaters(direction);
        const [char1, char2] = alignmentUpdater({ seq1: sequence1, seq2: sequence2, row, col });
        aligned1.unshift(char1);
        aligned2.unshift(char2);
        const coordinateUpdater = coordinateUpdaters(direction);
        [row, col] = coordinateUpdater([row, col]);
        coordinateWalk.push([row, col]);
    }
    return {
        alignedSequence1: aligned1.join(''),
        alignedSequence2: aligned2.join(''),
        coordinateWalk,
    };
}

module.exports = {
    align,
    getTracebackDirection,
};
