const { createMatrix, extractColumn, extractRow } = require('./matrix.utils');
const { directions } = require('./dtypes');

function computeGapLength(sequence) {
    let max = -1;
    let gapLength = 0;
    for (let cursor = 1; cursor < sequence.length; cursor += 1) {
        if (max < sequence[cursor]) {
            max = sequence[cursor];
            gapLength = cursor;
        }
    }
    return { max, gapLength };
}

const scoreReducer = (max, score) => (score.value > max.value ? score : max);

function smithWaterman({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = createMatrix({ width, heigth });
    const tracebackMatrix = createMatrix({ width, heigth });

    let highestScore = 0;
    let highestScoreCoordinates = [0, 0];

    // Fill the matrices.
    for (let row = 1; row < heigth; row += 1) {
        for (let col = 1; col < width; col += 1) {
            const leftSequence = extractRow({ matrix: scoringMatrix, row, col });
            const topSequence = extractColumn({ matrix: scoringMatrix, row, col });
            const { max: leftMax, gapLength: leftGapLength } = computeGapLength(
                leftSequence.reverse(),
            );
            const { max: topMax, gapLength: topGapLength } = computeGapLength(
                topSequence.reverse(),
            );
            const similarity = similarityScoreFunction(sequence1[row - 1], sequence2[col - 1]);
            const scores = [
                { value: topMax + gapScoreFunction(topGapLength), direction: directions.UP },
                { value: leftMax + gapScoreFunction(leftGapLength), direction: directions.LEFT },
                {
                    value: scoringMatrix[row - 1][col - 1] + similarity,
                    direction: directions.DIAGONAL,
                },
            ];

            const { value: bestScore, direction } = scores.reduce(scoreReducer, {
                value: 0,
                direction: directions.NONE,
            });
            scoringMatrix[row][col] = bestScore;
            tracebackMatrix[row][col] = direction;

            if (bestScore >= highestScore) {
                highestScore = bestScore;
                highestScoreCoordinates = [row, col];
            }
        }
    }

    return {
        alignmentScore: highestScore,
        startCoordinates: highestScoreCoordinates,
        scoringMatrix,
        tracebackMatrix,
    };
}

module.exports = smithWaterman;
