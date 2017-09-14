### Smith-Waterman Algorithm

###### *Personal version of the smith-waterman distance algorithm implemented by [ttrfstud](https://github.com/ttrfstud/smith-waterman).*
---

1. [Foreword](#foreword)
2. [Getting started](#getting-started)
3. [Optimum local alignment](#score-matrix-and-optimum-local-alignment)
4. [Graphic alignment](#graphic-alignment)
5. [Distance scoring](#distance-scoring)

#### Foreword
The [Smith-Waterman](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm) algorithm is primarily used for local alignment of string sequences from biological datasources (DNA, RNA, protein). Anyhow, I personally implemented this algorithm, with good outcomes, for scoring the distance of user inputs from an array of predefined standards and perform further operation on the basis of the results.

If you intend to use this code to compare text strings you will need to preprocess your data in order to remove spaces. Punctuation does not compromise the alignment, so it is not strictly necessary to remove it.

#### Getting started
To get started include the package in your project and import it like so:
`const sw = require('<path_to_index.js>')`

#### Score matrix and optimum local alignment
`sw.run(seq1, seq2, gss, simfunc)` is the main method. It takes four arguments:
* `seq1` - first character sequence.
* `seq2` - second character sequence.
* `gss` - function that takes a single argument `k`. It describes the penalty score for an in/del gap of length `k`.
* `simfunc` - function that takes two characters as arguments. It compares characters from the input strings and computes similarity scores.

Here is a basic example of similarity function:
```javascript
function simfunc(a, b) {
  if (a === b) {
    return 2;
  }
  return -1;
};

```

The methods return the coordinate walk (of the distance score matrix) representing the optimum local alignment of the two input sequences.

#### Graphic alignment
`sw.align(str1, str2, gss, sim)` wraps the method `sw.run()`, it takes the same arguments as `sw.run()` and returns an object containing the string aligned relatively to each other. Dashes (`-`) are used to represent insertion/deletions. The function adds on the basic `sw.run()` by using the coordinate walk to reconstruct a graphic alignment of the sequences.
The method returns an object structured like so:
``` javascript
{
	str1: 'thisisan-example',
  	str2: 'thisisoneexample',
  	walk:[ 
  		{ i: 14, j: 15 },
     	{ i: 13, j: 14 },
	     { i: 12, j: 13 },
	     { i: 11, j: 12 },
	     { i: 10, j: 11 },
	     { i: 9, j: 10 },
	     { i: 8, j: 9 },
	     { i: 7, j: 8 },
	     { i: 7, j: 7 },
	     { i: 6, j: 6 },
	     { i: 5, j: 5 },
	     { i: 4, j: 4 },
	     { i: 3, j: 3 },
	     { i: 2, j: 2 },
	     { i: 1, j: 1 },
	     { i: 0, j: 0 }
	],
  	message: 'thisisan-example\nthisisoneexample'
}
```

#### Distance scoring
`sw.score(alignment, gapScore, mutationScore)` is a methods that allows to compute a naive distance score among the two sequences. The required arguments are `alignment` (the return object from `sw.align()`) and `gapScore`/`mutationScore` values for scoring insertions/deletions and mutations respectively.
