const { align } = require('./traceback');
const { reverse } = require('./utils');
const smithWaterman = require('./smithWaterman');

const SWAligner = ({
    similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1),
    gapScoreFunction = reverse,
    gapSymbol = '-',
} = {}) => (sequence1, sequence2) => {
    const tracebackMatrix = smithWaterman({
        sequence1,
        sequence2,
        gapScoreFunction,
        similarityScoreFunction,
    });
    const { alignedSequence1, alignedSequence2, coordinateWalk } = align({
        sequence1,
        sequence2,
        tracebackMatrix,
        gapSymbol,
    });

    return {
        originalSequence1: sequence1,
        originalSequence2: sequence2,
        alignedSequence1,
        alignedSequence2,
        coordinateWalk,
        tracebackMatrix,
        alignment: `${alignedSequence1}\n${alignedSequence2}`,
    };
};

module.exports = SWAligner;
