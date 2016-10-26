'use strict';

function score(alignment, gapScore, mutationScore) {
    const str1 = alignment.str1.split('');
    const str2 = alignment.str2.split('');
    let score = 0;

    str1.forEach((pos, i) => {
        if (pos === '-' || str2[i] === '-') {
            score += gapScore;
        } else if (pos !== str2[i]) {
            score += mutationScore;
        }
    });

    return score;
}

module.exports = score;
