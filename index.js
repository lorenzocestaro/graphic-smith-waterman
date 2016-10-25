'use strict';

const mmatch = require('./fn/mmatch');
const deletion = require('./fn/deletion');
const insertion = require('./fn/insertion');
const defdir = require('./fn/defdir');
const restorelm = require('./fn/restorelm');

const dir = require('./obj/dir');

function sw(seq1, seq2, gss, simfunc) {
    const len1 = seq1.length;
    const len2 = seq2.length;
    const h = [];
    const t = [];

    let mmscore = 0;
    let delscore = 0;
    let inscore = 0;

    h[0] = [];
    t[0] = [];

    for (let i = 0; i < len2 + 1; i += 1) {
        h[0][i] = 0;
        t[0][i] = dir.none;
    }

    for (let i = 0; i < len1 + 1; i += 1) {
        if (!h[i]) {
            h[i] = [];
            t[i] = [];
        }

        h[i][0] = 0;
        t[i][0] = dir.none;
    }

    for (let i = 1; i < len1 + 1; i += 1) {
        for (let j = 1; j < len2 + 1; j += 1) {
            mmscore = mmatch(h, i, j, seq1, seq2, simfunc);
            delscore = deletion(h, i, j, gss);
            inscore = insertion(h, i, j, gss);

            h[i][j] = Math.max(0, mmscore, delscore, inscore);
            t[i][j] = defdir(h[i][j], mmscore, delscore, inscore);
        }
    }

    const longestmatch = restorelm(h, t);

    return longestmatch;
}

module.exports = sw;
