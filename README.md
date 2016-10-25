smith-waterman algorithm
==========================
### Personal version of the smith-waterman distance algorithm implemented by [ttrfstud](https://github.com/ttrfstud/smith-waterman).

The exported method takes four arguments: `(seq1, seq2, gss, simfunc)`.
* `seq1` - first character sequence.
* `seq2` - second character sequence.
* `gss` - function that takes a single argument `k`. It describes the penalty score for an in/del gap of length `k`.
* `simfunc` - function that takes two characters as arguments. It compares characters from the input strings and computes similarity scores
