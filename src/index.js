const { align } = require('./traceback');
const smithWaterman = require('./smithWaterman');

const defaultGapScore = k => -k;
const defaultSimilarityScore = (char1, char2) => (char1 === char2 ? 2 : -1);

function SWAligner ({
    sequence1,
    sequence2,
    gapScoreFunction = defaultGapScore,
    similarityScoreFunction = defaultSimilarityScore,
}){
    const tracebackMatrix = smithWaterman({
        sequence1,
        sequence2,
        gapScoreFunction,
        similarityScoreFunction,
    });
    const { alignment, coordinateWalk } = align({ sequence1, sequence2, tracebackMatrix });
    return {
        alignment,
        coordinateWalk,
        log: () => console.log(alignment),
        tracebackMatrix,
    }
};

module.exports = SWAligner;
