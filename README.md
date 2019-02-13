### Smith-Waterman Algorithm

###### *Smith-Waterman algorithm with graphic string alignment.*
---

1. [Foreword](#foreword)
2. [Getting started](#getting-started)
3. [Usage](#usage)

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

#### Usage
`SWaligner` behaves like a factory, you can instantiate many aligners with
different parameters and re-use each one multiple times. A single aligner is
configurable with the following parameters:
* `similarityScoreFunction`: takes two characters (string) as input and returns
a similarity score (integer).
* `gapScoreFunction`: takes one positive integer as input (gap length) and
returns a score (integer).
* `gapSymbol`: a custom character (string) used to represent gaps in the
alignment. Defaults to `-`.

Here are the default function values for `similarityScoreFunction` and
`gapScoreFunction`:
```javascript
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1);
const gapScoreFunction = k => -k;
```

Higher score for gaps means means higher chances of having one inserted.
Generally you should choose a function that gives higher score to shorter gaps.

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
// > insertion
// > dele-tion

console.log(customResult.alignment)
// > i~nser~~tion
// > ~d~~e~letion
```

#### Aligner object
The aligner object (`const aligner = SWaligner();`) has the following keys:
* `similarityScoreFunction`: function used to compute character similarity
scores.
* `gapScoreFunction`: function to compute gap scores.
* `gapSymbol`: symbol used to represents gaps in the alignment.
* `align`: function to compute the Smith-Waterman alignment between two strings.

#### Alignment object
The `align` method returns an object with the following properties:
* `originalSequences List[str]`: original input sequences.
* `alignedSequences List[str]`: aligned sequences.
* `coordinateWalk List[List[int]]`: coordinate walk from the traceback matrix.
* `tracebackMatrix List[List[int]]`: alignment traceback matrix.
* `alignment [str]`: printable visual alignment string.
