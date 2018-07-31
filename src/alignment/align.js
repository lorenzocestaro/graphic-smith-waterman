'use strict';

const sw = require('../algorithm');

function align(str1, str2, gss, sim) {
    const alignment = {
        str1: [],
        str2: []
    };
    str1 = str1.split('');
    str2 = str2.split('');
    const walk = sw(str1, str2, gss, sim);

    if (!walk.length) {
        return {
            alignment: null,
            message: 'Unable to align strings'
        };
    }

    // Alignment's middle reconstruction
    walk.forEach((step, index) => {
        const nextStep = walk[index + 1];

        if (!nextStep) {
            alignment.str1.push(str1[step.i]);
            alignment.str2.push(str2[step.j]);
        } else if (step.i === nextStep.i && step.i !== 0) {
            alignment.str1.push('-');
            alignment.str2.push(str2[step.j]);
        } else if (step.j === nextStep.j && step.j !== 0) {
            alignment.str1.push(str1[step.i]);
            alignment.str2.push('-');
        } else if (step.i === 0 && nextStep.i === 0) {
            alignment.str1.push('-');
            alignment.str2.push(str2[step.j]);
        } else if (step.j === 0 && nextStep.j === 0) {
            alignment.str1.push(str1[step.i]);
            alignment.str2.push('-');
        } else {
            alignment.str1.push(str1[step.i]);
            alignment.str2.push(str2[step.j]);
        }
    });

    // Alignment's starting edge reconstruction
    const minWalk = {
        i: walk.slice(-1)[0].i - 1,
        j: walk.slice(-1)[0].j - 1
    };

    while (minWalk.i >= 0) {
        alignment.str1.push(str1[minWalk.i]);
        alignment.str2.push('-');
        minWalk.i -= 1;
    }

    while (minWalk.j >= 0) {
        alignment.str1.push('-');
        alignment.str2.push(str2[minWalk.j]);
        minWalk.j -= 1;
    }

    // Alignment's ending edge reconstruction
    const maxWalk = {
        i: walk[0].i + 1,
        j: walk[0].j + 1
    };

    while (str1[maxWalk.i] || str2[maxWalk.j]) {
        alignment.str1.unshift(
            str1[maxWalk.i] ? str1[maxWalk.i] : '-'
        );
        alignment.str2.unshift(
            str2[maxWalk.j] ? str2[maxWalk.j] : '-'
        );

        maxWalk.i += 1;
        maxWalk.j += 1;
    }

    // String reconstruction
    alignment.str1 = alignment.str1.reverse().join('');
    alignment.str2 = alignment.str2.reverse().join('');
    alignment.walk = walk;
    alignment.message = `${alignment.str1}\n${alignment.str2}`;

    return alignment;
}

module.exports = align;
