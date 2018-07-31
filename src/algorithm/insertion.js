'use strict';

// gss - gap-scoring scheme
function insertion(h, i, j, gss) {
    let max;
    let maxidx;

    max = -1;

    for (let l = j - 1; l >= 0; l -= 1) {
        if (max < h[i][l]) {
            max = h[i][l];
            maxidx = l;
        }
    }

    max += gss(j - maxidx);

    return max;
}

module.exports = insertion;
