'use strict';

const align = require('./alignment').align;
const compute = require('./algorithm');
const score = require('./alignment').score;

console.log(align(
    'thisisanexample',
    'thisisoneexample',
    (k) => -Math.pow(k, 2),
    (a, b) => (a === b) ? 2 : -1
));

module.exports = {
    align: align,
    compute: compute,
    score: score
};
