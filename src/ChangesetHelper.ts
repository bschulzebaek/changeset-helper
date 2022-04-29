import createScheme from './utility/create-scheme';
import getDiff, { DiffInterface } from './utility/get-diff';

interface ReportInterface extends DiffInterface {
    equals: boolean;
}

export default class ChangesetHelper {

    /**
     * Creates a changeset between two objects.
     * The report contains the paths to all differing properties and is divided into "additions", "changes" and "deletions".
     * It also contains a Boolean indicating equality for quick access.
     */
    static compare(a: object, b: object): ReportInterface {
        let mapA = ChangesetHelper.createObjectMap(a),
            mapB = ChangesetHelper.createObjectMap(b);

        const diff = getDiff(mapA, mapB) as ReportInterface;

        diff.equals = !(diff.additions.length | diff.changes.length | diff.deletions.length);

        return diff;
    }

    /**
     * Returns a wrapper promise for the "compare" method.
     */
    static compareAsync(a: object, b: object): Promise<ReportInterface> {
        return new Promise((resolve) => {
            resolve(ChangesetHelper.compare(a, b));
        });
    }

    /**
     * Creates a changeset between two objects, but only returns if the objects are equal.
     */
    static isEqual(a: object, b: object): boolean {
        return ChangesetHelper.compare(a, b).equals;
    }

    /**
     * Creates a changeset between two objects, but only returns the additions.
     */
    static getAdditions(a: object, b: object): string[] {
        return ChangesetHelper.compare(a, b).additions;
    }

    /**
     * Creates a changeset between two objects, but only returns the changes.
     */
    static getChanges(a: object, b: object): string[] {
        return ChangesetHelper.compare(a, b).changes;
    }

    /**
     * Creates a changeset between two objects, but only returns the deletions.
     */
    static getDeletions(a: object, b: object): string[] {
        return ChangesetHelper.compare(a, b).deletions;
    }

    /**
     * Creates scheme between an object.
     * The object properties will be represented by a 1-dimensional map.
    */
    static createObjectMap(source: object): Map<string, unknown> {
        const rawScheme = createScheme(source),
              map = new Map();

        rawScheme.forEach((path: string[]) => {
            map.set(path.join('.'), ChangesetHelper.getProperty(source, path));
        });

        return map;
    }

    /**
     * Returns a property based on the scheme path.
    */
    static getProperty(obj: object, path: string[]): unknown|null {
        let current = obj as any;

        for (let i = 0; i < path.length; i++) {
            if (!current[path[i]]) {
                return null;
            }

            current = current[path[i]];
        }

        return current;
    }
}