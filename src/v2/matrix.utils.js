const createMatrix = ({ width, heigth }) =>
    Array(heigth)
        .fill(0)
        .map(() => Array(width).fill(0));

const extractRow = ({ matrix, row, col }) => matrix[row].slice(0, col + 1);

const extractColumn = ({ matrix, row, col }) =>
    matrix
        .slice(0, row + 1)
        .map(_row => _row.slice(col, col + 1))
        .reduce((prev, curr) => [...prev, ...curr], []);

const shape = matrix => ({ width: (matrix[0] && matrix[0].length) || 0, heigth: matrix.length });

function* matrixIterator(matrix) {
    const { width, heigth } = shape(matrix);
    for (let row = 0; row < heigth; row += 1) {
        for (let col = 0; col < width; col += 1) {
            yield matrix[row][col];
        }
    }
}

module.exports = {
    createMatrix,
    extractColumn,
    extractRow,
    matrixIterator,
    shape,
};
