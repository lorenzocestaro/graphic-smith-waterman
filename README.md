### Smith-Waterman Algorithm

> :information_source: Important communication :information_source:
>
> Dear users, I have included this codebase in a new and updated package called
> [seqalign](https://github.com/lorenzocestaro/seqalign). It aims to become a
> collection of sequence alignment algorithms. For now it includes  Smith-Waterman
> and Needleman-Wunsch and I plan on expanding it in the future.

---

[![Build Status](https://travis-ci.org/lorenzocestaro/graphic-smith-waterman.svg?branch=master)](https://travis-ci.org/lorenzocestaro/graphic-smith-waterman)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e71505ebaff9557852d/maintainability)](https://codeclimate.com/github/lorenzocestaro/graphic-smith-waterman/maintainability)
[![npm version](https://badge.fury.io/js/graphic-smith-waterman.svg)](https://badge.fury.io/js/graphic-smith-waterman)

1. [Foreword](#foreword)
2. [Getting started](#getting-started)
3. [SWaligner](#swaligner)
4. [Defaults](#defaults)
5. [Usage](#usage)
6. [Alignment result](#alignment-result)

#### Foreword
The [Smith-Waterman](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)
algorithm is primarily used for local alignment of string sequences from
biological datasources (DNA, RNA, protein). I used this algorithm, with good
outcomes, for scoring the distance of user inputs from an array of predefined
standards.

If you intend to use this code to compare text strings you will need to
preprocess your data in order to remove spaces. Punctuation does not compromise
the alignment and can be kept.

#### Getting started
Install the package from npm:
```bash
$ npm install --save graphic-smith-waterman
```
Import the package in your project:
```javascript
const SWaligner = require('graphic-smith-waterman')
```

#### SWaligner
`SWaligner` is a factory, you can create many aligners with different
 parameters and re-use each one multiple times. An aligner is configurable
 with the following parameters (all of them are optional):
* `similarityScoreFunction`: takes two characters (string) as input and returns
a similarity score (integer).
* `gapScoreFunction`: takes one positive integer as input (gap length) and
returns a score (integer).
* `gapSymbol`: a custom character (string) used to represent gaps in the
alignment.
* `directions`: enum object used to define direction codes for the traceback
matrix.

> _Tip: Higher scores for gaps means higher chances of having one inserted.
> Generally you should choose a function that gives higher scores to shorter
> gaps._

#### Defaults
Here are the default values for the aligner options:
```javascript
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1);
const gapScoreFunction = k => -k;
const gapSymbol = '-';
const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    UP: 3,
});
```
Generally, you should not have the need to change the directions enum, but if
you need to carry out operations on the traceback matrix yourself, you can
define your custom characters, remember:
* It is not necessary to freeze the custom directions object but it is
recommended.
* Do not change enum keys (i.e. `NONE`, `DIAGONAL`, `LEFT`, `UP`) or the
algorithm will not work.

#### Usage
Instantiating `SWaligner` returns an aligner object which exposes an `align`
method. `align` accepts the two strings to align as input:
```javascript
const SWaligner = require('graphic-smith-waterman')

const defaultAligner = SWaligner();
const customAligner = SWaligner({
  gapScoreFunction: x => x / 2,
  gapSymbol: '~',
})

const defaultResult = defaultAligner.align('insertion', 'deletion');
const customResult = customAligner.align('insertion', 'deletion');

console.log(defaultResult.alignment)
// > ertion
// > e-tion

console.log(customResult.alignment)
// > inse~~rtion
// > ~~~ele~tion
```

#### Alignment result
The `align` method returns an object with the following properties:
* `score <int>`: alignment score.
* `originalSequences Array<str>`: original input sequences.
* `alignedSequences Array<str>`: locally aligned sequences.
* `scoringMatrix Array<Array<int>>`: alignment scores matrix.
* `tracebackMatrix Array<Array<int>>`: alignment traceback directions matrix.
* `coordinateWalk Array<Array<int>>`: coordinate walk from the traceback matrix.
* `alignment <str>`: printable visual alignment string.
