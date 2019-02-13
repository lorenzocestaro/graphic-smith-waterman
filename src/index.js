const { align } = require('./traceback');
const { reverse } = require('./utils');
const smithWaterman = require('./smithWaterman');

const SWAligner = ({
    similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1),
    gapScoreFunction = reverse,
    gapSymbol = '-',
} = {}) => ({
    similarityScoreFunction,
    gapScoreFunction,
    gapSymbol,
    align(sequence1, sequence2) {
        const tracebackMatrix = smithWaterman({
            sequence1,
            sequence2,
            gapScoreFunction: this.gapScoreFunction,
            similarityScoreFunction: this.similarityScoreFunction,
        });
        const { alignedSequence1, alignedSequence2, coordinateWalk } = align({
            sequence1,
            sequence2,
            tracebackMatrix,
            gapSymbol: this.gapSymbol,
        });
        return {
            originalSequences: [sequence1, sequence2],
            alignedSequences: [alignedSequence1, alignedSequence2],
            coordinateWalk,
            tracebackMatrix,
            alignment: `${alignedSequence1}\n${alignedSequence2}`,
        };
    },
});

module.exports = SWAligner;
