'use strict';

const { align, score } = require('./alignment');
const compute = require('./algorithm');

module.exports = {
    align: align,
    compute: compute,
    score: score
};
