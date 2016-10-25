'use strict';

function mmatch(h, i, j, seq1, seq2, simfunc) {
    const prevres = h[i - 1][j - 1];
    const seq1cur = seq1[i - 1];
    const seq2cur = seq2[j - 1];
    const simil = simfunc(seq1cur, seq2cur);
    const curres = prevres + simil;

    return curres;
}

module.exports = mmatch;
