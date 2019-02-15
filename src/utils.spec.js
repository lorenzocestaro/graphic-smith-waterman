const { apply, decreaseAndRectify, reverse } = require('./utils');

describe('Apply', () => {
    it('should return a function', () => {
        const applied = apply(jest.fn());
        expect(applied).toBeInstanceOf(Function);
    });
});

describe('Applied function', () => {
    it('should be called as many times as the items in the iterator', () => {
        const array = [1, 2, 3, 4, 5];
        const fnToApply = jest.fn();
        const applyFn = apply(fnToApply);
        applyFn(array);
        expect(fnToApply).toBeCalledTimes(array.length);
    });
    it('should raise an error when the input argument is not an array', () => {
        const faultyInput = 'string';
        const fnToApply = jest.fn();
        const applyFn = apply(fnToApply);
        expect(() => applyFn(faultyInput)).toThrowError(TypeError);
    });
});

describe('Decrease and rectify', () => {
    it.each([1, 2, 3, 4, 5, 10, 20, 100, 1.345])(
        'should decrement an integer greater then zero by one',
        n => expect(decreaseAndRectify(n)).toBe(n - 1),
    );
    it.each([0, -1, -2, -3, -54, -156, -89689, 0.34])(
        'should return zero if decrementing the input would return a negative number',
        n => expect(decreaseAndRectify(n)).toBe(0),
    );
    it.each(['string', [1, 2, 3], { a: 1, b: 2 }])(
        'should raise TypeError for non number inputs',
        n => expect(() => decreaseAndRectify(n)).toThrowError(TypeError),
    );
});

describe('Reverse', () => {
    it.each([0, -1, 2, -3, 54, -156, -89689, 0.34])(
        'should reverse the sign of every numeric input',
        n => expect(reverse(n)).toBe(-1 * n),
    );
    it.each(['string', [1, 2, 3], { a: 1, b: 2 }])(
        'should raise TypeError for non number inputs',
        n => expect(() => reverse(n)).toThrowError(TypeError),
    );
});
