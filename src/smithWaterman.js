const { createMatrix, extractColumn, extractRow } = require('./matrix.utils');
const { align, getTracebackDirection } = require('./traceback');

const defaultGapScore = k => -k;
const defaultSimilarityScore = (char1, char2) => (char1 === char2 ? 2 : -1);

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

function smithWaterman({
    sequence1,
    sequence2,
    gapScoreFunction = defaultGapScore,
    similarityScoreFunction = defaultSimilarityScore,
}) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = createMatrix({ width, heigth });
    const tracebackMatrix = createMatrix({ width, heigth });

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
            const deletionScore = topMax + gapScoreFunction(topGapLength);
            const insertionScore = leftMax + gapScoreFunction(leftGapLength);
            const mutationScore = scoringMatrix[row - 1][col - 1] + similarity;

            scoringMatrix[row][col] = Math.max(0, mutationScore, deletionScore, insertionScore);

            tracebackMatrix[row][col] = getTracebackDirection({
                currentScore: scoringMatrix[row][col],
                mutationScore,
                insertionScore,
                deletionScore,
            });
        }
    }
    return tracebackMatrix;
}

const sequence1 = 'asdfgh';
const sequence2 = 'ghjkl';
const tracebackMatrix = smithWaterman({ sequence1, sequence2 });
console.log(align({ sequence1, sequence2, tracebackMatrix }));

module.exports = smithWaterman;
