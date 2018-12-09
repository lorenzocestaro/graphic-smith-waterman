// gss - gap-scoring scheme
function deletion(h, i, j, gss) {
    let maxidx;
    let max = -1;

    for (let k = i - 1; k >= 0; k -= 1) {
        if (max < h[k][j]) {
            max = h[k][j];
            maxidx = k;
        }
    }

    max += gss(i - maxidx);

    return max;
}

module.exports = deletion;
