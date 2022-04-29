import createScheme from '../../src/utility/create-scheme';

describe('create-scheme', () => {
    it('creates a valid scheme for a nested source object', () => {
        const source = {
            foo: 'bar',
            john: 'doe',
            level1: {
                prop1: 1,
                prop2: 2,
                prop3: 3,
                level2: {
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    level3: {
                        prop1: 1,
                        prop2: 2,
                        prop3: 3
                    }
                },
                level2_2: {
                    foo2: 'bar',
                    john2: 'doe',
                }
            }
        };

        const expected = [
            ['foo'],
            ['john'],
            ['level1', 'prop1'],
            ['level1', 'prop2'],
            ['level1', 'prop3'],
            ['level1', 'level2', 'prop1'],
            ['level1', 'level2', 'prop2'],
            ['level1', 'level2', 'prop3'],
            ['level1', 'level2', 'level3', 'prop1'],
            ['level1', 'level2', 'level3', 'prop2'],
            ['level1', 'level2', 'level3', 'prop3'],
            ['level1', 'level2_2', 'foo2'],
            ['level1', 'level2_2', 'john2'],
        ].sort();

        /**
         * Note: The order doesn't matter, since every path will be unique anyway.
         *       However, due to object aggregations and such (e.g. by APIs), it's usually a good idea, to sort these values manually before comparison.
         *       Of course this doesn't really apply to this test case.
         */
        const received = createScheme(source).sort();

        expect(received).toEqual(expected);
    });

    it('also works with arrays and objects in arrays', () => {
        const source = {
            foo: [ 'bar' ],
            nested: {
                john: [ 'doe', { foo2: 'bar2' } ],
            }
        };

        const expected = [
            [ 'foo', '0' ],
            [ 'nested', 'john', '0' ],
            [ 'nested', 'john', '1', 'foo2' ]
        ].sort();

        const received = createScheme(source).sort();

        expect(received).toEqual(expected);
    });
});