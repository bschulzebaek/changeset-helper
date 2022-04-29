import getDiff from '../../src/utility/get-diff';

describe('get-diff', () => {
    it('creates a "addition" diff of two maps', () => {
        const mapA = new Map([ [ 'foo', 'bar' ], [ 'john', 'doe' ] ]),
              mapB = new Map([ [ 'foo', 'bar' ], [ 'john', 'doe' ], [ 'foo2', 'bar2' ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([ 'foo2' ]);
        expect(diff.changes).toEqual([]);
        expect(diff.deletions).toEqual([]);
    });

    it('creates a "changes" diff of two maps', () => {
        const mapA = new Map([ [ 'foo', 'bar' ], [ 'john', 'doe' ] ]),
              mapB = new Map([ [ 'foo', 'doe' ], [ 'john', 'bar' ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo', 'john' ]);
        expect(diff.deletions).toEqual([]);
    });

    it('creates a "deletion" diff of two maps', () => {
        const mapA = new Map([ [ 'foo', 'bar' ], [ 'john', 'doe' ], [ 'foo2', 'bar2' ] ]),
              mapB = new Map([ [ 'foo', 'bar' ], [ 'john', 'doe' ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([]);
        expect(diff.deletions).toEqual([ 'foo2' ]);
    });

    it('detects changes from "null" values', () => {
        const mapA = new Map([ [ 'foo', null ] ]),
              mapB = new Map([ [ 'foo', 'bar' ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo' ]);
        expect(diff.deletions).toEqual([]);
    });

    it('detects changes to "null" values', () => {
        const mapA = new Map([ [ 'foo', 'bar' ] ]),
              mapB = new Map([ [ 'foo', null ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo' ]);
        expect(diff.deletions).toEqual([]);
    });

    it('detects changes from "undefined" values', () => {
        const mapA = new Map([ [ 'foo', undefined ] ]),
              mapB = new Map([ [ 'foo', 'bar' ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo' ]);
        expect(diff.deletions).toEqual([]);
    });

    it('detects changes to "undefined" values', () => {
        const mapA = new Map([ [ 'foo', 'bar' ] ]),
              mapB = new Map([ [ 'foo', undefined ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo' ]);
        expect(diff.deletions).toEqual([]);
    });

    it('interprets addition or removal of primitive array items as change', () => {
        const mapA = new Map([ [ 'foo', [ 'bar' ] ] ]),
              mapB = new Map([ [ 'foo', [ 'bar', 'john', 'doe' ] ] ]);

        const diff = getDiff(mapA, mapB);

        expect(diff.additions).toEqual([]);
        expect(diff.changes).toEqual([ 'foo' ]);
        expect(diff.deletions).toEqual([]);
    });
});