Smith-Waterman Algorithm
### Personal version of the smith-waterman distance algorithm implemented by [ttrfstud](https://github.com/ttrfstud/smith-waterman).
==========================

### sw()
This is the main method, it takes four arguments: `sw(seq1, seq2, gss, simfunc)`.
* `seq1` - first character sequence.
* `seq2` - second character sequence.
* `gss` - function that takes a single argument `k`. It describes the penalty score for an in/del gap of length `k`.
* `simfunc` - function that takes two characters as arguments. It compares characters from the input strings and computes similarity scores

### align()
This method wraps `sw()`, thakes the same arguments and returns an object containing the string aligned relatively to each other. Dashes (`-`) are used to represent insertion/deletions