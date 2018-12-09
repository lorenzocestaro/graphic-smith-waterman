const directions = {
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    UP: 3,
};

function getDirection({
    currentScore,
    mutationScore,
    insertionScore,
    deletionScore,
}) {
    if (currentScore < 0) {
        return directions.NONE;
    }

    const directionSwitch = {
        [mutationScore]: directions.DIAGONAL,
        [insertionScore]: directions.LEFT,
        [deletionScore]: directions.UP,
    };

    return directionSwitch[currentScore];
}

module.exports = {
    getDirection,
};
