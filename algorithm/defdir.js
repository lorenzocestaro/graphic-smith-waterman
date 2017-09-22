'use strict';

const dir = require('../directions');

function defDirection(cursorScore, mmScore, delScore, inScore) {
    let cursorDirection;

    if (cursorScore === mmScore) {
        cursorDirection = dir.diag;
    } else if (cursorScore === delScore) {
        cursorDirection = dir.up;
    } else if (cursorScore === inScore) {
        cursorDirection = dir.left;
    }

    if (cursorScore < 0) {
        cursorDirection = dir.none;
    }

    return cursorDirection;
}

module.exports = defDirection;
