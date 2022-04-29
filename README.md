# changeset-helper

[![Publish](https://github.com/bschulzebaek/changeset-helper/actions/workflows/publish.yml/badge.svg)](https://github.com/bschulzebaek/changeset-helper/actions/workflows/publish.yml) [![Unit](https://github.com/bschulzebaek/changeset-helper/actions/workflows/test.yml/badge.svg)](https://github.com/bschulzebaek/changeset-helper/actions/workflows/test.yml) [![Build](https://github.com/bschulzebaek/changeset-helper/actions/workflows/build.yml/badge.svg)](https://github.com/bschulzebaek/changeset-helper/actions/workflows/build.yml) ![PRs](https://img.shields.io/badge/PRs-Welcome-informational)



A small helper for generating changesets based on the diff between two objects of any depth. The changeset is divided into "additions", "changes" and "deletions".

* [Installation](#installation)
* [Usage](#usage)
* [Supported types](#supported-types)
* [API](#api)

## Installation

```
npm i --save changeset-helper
```

## Usage

```JavaScript
import ChangesetHelper from 'changeset-helper';

const a = {
    foo: 'bar',
    john: 'doe',
    foo2: 'bar-2'
};

const b = {
    foo: 'bar',
    john: '',
    john2: 'doe-2'
};

const report = ChangesetHelper.compare(a, b);

/*
    {
        additions: [ 'john2' ],
        changes: [ 'john' ],
        deletions: [ 'foo2' ],
        equals: false
    }
*/
```

## Supported types

Types listed as unsupported will be ignored during the changeset generation and won't break the remaining types.

| Type | Supported | Comment |
|---|---|---|
| boolean | ✅ |   |
| string | ✅ |   |
| number | ✅ |   |
| null | ✅ |   |
| undefined | ✅ |   |
| Object | ✅ | Objects are never compared to each other, but rather all their properties. |
| Arrays | ✅ | Addition or removal of **primitive** items are interpreted as "changes" to the array. |
| Functions | ⛔ | Currently not supported to detect changes due to possible performance issues caused by big datasets including large functions. For consistency, additions and deletions are also not supported. |

## API

ReportInterface
```TypeScript
interface ReportInterface {
    equals: boolean;
    additions: string[];
    changes: string[];
    deletions: string[];
}
```

ChangesetHelper
```TypeScript
class ChangesetHelper {
    /**
     * Creates a changeset between two objects.
     * The report contains the paths to all differing properties and is divided into "additions", "changes" and "deletions".
     * It also contains a Boolean indicating equality for quick access.
     */
    static compare(a: object, b: object): ReportInterface;

    /**
     * Returns a wrapper promise for the "compare" method.
     */
    static compareAsync(a: object, b: object): Promise<ReportInterface>;

    /**
     * Creates a changeset between two objects, but only returns if the objects are equal.
     */
    static isEqual(a: object, b: object): boolean;

    /**
     * Creates a changeset between two objects, but only returns the additions.
     */
    static getAdditions(a: object, b: object): string[];

    /**
     * Creates a changeset between two objects, but only returns the changes.
     */
    static getChanges(a: object, b: object): string[];

    /**
     * Creates a changeset between two objects, but only returns the deletions.
     */
    static getDeletions(a: object, b: object): string[];

    /**
     * Creates scheme between an object.
     * The object properties will be represented by a map.
    */
    static createObjectMap(source: object): Map<string, unknown>;

    /**
     * Returns a property based on the scheme path.
    */
    static getProperty(obj: object, path: string[]): unknown | null;
}
```
