'use strict';

const align = require('./alignment').align;
const compute = require('./algorithm');
const score = require('./alignment').score;

module.exports = {
    align: align,
    compute: compute,
    score: score
};
