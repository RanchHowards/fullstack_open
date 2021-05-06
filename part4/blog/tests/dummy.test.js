const dummy = require('../utils/for_testing').dummy

describe('dummy test run', () => {
    test('empty blog list', () => {
        const list = []
        expect(dummy(list)).toBe(1)
    })
})