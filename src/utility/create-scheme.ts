/**
 * Create a scheme for an object.
 * The object is represented by an multi-dimensional array of property paths.
 */
export default function createScheme(source: object, path: string[] = []): string[][] {
    let scheme: string[][] = [];

    Object.entries(source).forEach(([ key, value ]: [string, any]) => {
        if (typeof value === 'function') {
            return;
        } else if (typeof value === 'object') {
            scheme.push(...createScheme(value, [ ...path, key ]));
        } else {
            scheme.push([ ...path, key ]);
        }
    });

    return scheme;
}