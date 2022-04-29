export interface DiffInterface {
    additions: string[];
    changes: string[];
    deletions: string[];
}

export default function getDiff(mapA: Map<string, unknown>, mapB: Map<string, unknown>): DiffInterface {
    const additions: string[] = [],
          changes: string[] = [],
          deletions: string[] = [];

    mapA.forEach((value, key) => {
        if (!mapB.has(key)) {
            deletions.push(key);
        } else if (value !== mapB.get(key)) {
            changes.push(key);
        } else {
            mapB.delete(key);
        }
    });

    mapB.forEach((value, key) => {
        if (!mapA.has(key)) {
            additions.push(key);
        }
    });

    return {
        additions,
        changes,
        deletions
    }
}