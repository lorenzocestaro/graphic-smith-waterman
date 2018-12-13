const { findMaxNumber } = require('./matrix.utils');
const { decreaseAllByOne, decreaseByOne } = require('./utils');

const directions = {
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    UP: 3,
};

const coordinateUpdaters = direction => {
    const getters = {
        [directions.DIAGONAL]: decreaseAllByOne,
        [directions.LEFT]: (row, col) => [row, decreaseByOne(col)],
        [directions.UP]: (row, col) => [decreaseByOne(row), col],
        [directions.NONE]: (row, col) => [row, col],
    };
    return getters[direction];
};

function getDirection({ currentScore, mutationScore, insertionScore, deletionScore }) {
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

function getCoordinateWalk({ scoringMatrix, tracebackMatrix }) {
    let { row, col } = findMaxNumber(scoringMatrix);
    const coordinatesWalk = [];
    while (scoringMatrix[row][col] !== 0) {
        const direction = tracebackMatrix[row][col];
        const coordinateUpdater = coordinateUpdaters(direction);
        [row, col] = coordinateUpdater(row, col);
        coordinatesWalk.push({ row, col });
    }
    return coordinatesWalk;
}

module.exports = {
    getCoordinateWalk,
    getDirection,
};
