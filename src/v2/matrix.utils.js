const createMatrix = ({ width, heigth }) => Array(heigth)
    .fill(0)
    .map(() => Array(width).fill(0));

const extractRow = ({ matrix, row, col }) => matrix[row].slice(0, col + 1);

const extractColumn = ({ matrix, row, col }) => matrix
    .slice(0, row + 1)
    .map(_row => _row.slice(col, col + 1))
    .reduce((prev, curr) => [...prev, ...curr], []);

module.exports = {
    createMatrix,
    extractColumn,
    extractRow,
}
