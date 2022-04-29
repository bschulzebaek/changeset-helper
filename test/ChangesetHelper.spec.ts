import ChangesetHelper from '../src/ChangesetHelper';

describe('ChangesetHelper', () => {

    it ('compare > creates a report for two equal objects', () => {
        const sourceA = {
            foo: 'bar',
            john: 'doe',
        };

        const sourceB = {
            foo: 'bar',
            john: 'doe',
        };

        const received = ChangesetHelper.compare(sourceA, sourceB);

        expect(received.equals).toBe(true);
    });

    it('compare > creates a report including an addition', () => {
        const sourceA = {
            foo: 'bar',
            john: 'doe',
        };

        const sourceB = {
            foo: 'bar',
            john: 'doe',
            foo2: 'bar2'
        };

        const received = ChangesetHelper.compare(sourceA, sourceB);

        expect(received.equals).toBe(false);
    });

    it('getProperty > searches an object for a property based on the split path', () => {
        const input = {
            foo: {
                foo2: {
                    foo3: 'bar'
                },
                john: 'doe'
            }
        };

        const pathA = ['foo', 'foo2', 'foo3'],
              pathB = ['foo', 'john'],
              expectedA = 'bar',
              expectedB = 'doe';

        expect(ChangesetHelper.getProperty(input, pathA)).toEqual(expectedA);
        expect(ChangesetHelper.getProperty(input, pathB)).toEqual(expectedB);
    });
});