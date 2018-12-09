const dir = require('../directions');

function restorelm(h, t) {
    const len1 = h.length;
    const len2 = h[0].length;
    const walk = [];
    let max = -1;
    let maxi;
    let maxj;

    for (let i = 0; i < len1; i += 1) {
        for (let j = 0; j < len2; j += 1) {
            if (max < h[i][j]) {
                max = h[i][j];
                maxi = i;
                maxj = j;
            }
        }
    }


    for (let i = maxi, j = maxj; h[i][j];) {
        walk.push({ i: i - 1, j: j - 1 });

        switch (t[i][j]) {
            case dir.diag:
                i -= 1;
                j -= 1;
                break;
            case dir.left:
                j -= 1;
                break;
            case dir.up:
                i -= 1;
                break;
            default:
                break;
        }
    }

    return walk;
}

module.exports = restorelm;
