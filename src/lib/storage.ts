import type { Hero } from "./domain/hero";

const STORAGE_KEY = "herald-a-hero/heroes";
const SAVE_VERSION = 1;

export type SaveData = {
    version: typeof SAVE_VERSION;
    heroes: readonly Hero[];
};

function read(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function write(key: string, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch {
        // TODO
    }
}

export function createSave(heroes: Hero[]): SaveData {
    return {
        version: SAVE_VERSION,
        heroes,
    };
}

function isSaveData(data: unknown): data is SaveData {
    return (
        typeof data === "object" &&
        data !== null &&
        "version" in data &&
        data.version === SAVE_VERSION &&
        "heroes" in data &&
        Array.isArray(data.heroes)
    );
}

export function parseSave(raw: string): SaveData | undefined {
    try {
        const data: unknown = JSON.parse(raw);
        if (isSaveData(data)) return data;
    } catch {
        // TODO
    }

    return undefined;
}

export function loadSave(): SaveData | undefined {
    const raw = read(STORAGE_KEY);

    if (raw === null) return undefined;

    const data = parseSave(raw);

    if (!data) write(`${STORAGE_KEY}.backup`, raw);

    return data;
}

export function storeSave(data: SaveData): void {
    const raw = JSON.stringify(data);
    write(STORAGE_KEY, raw);
}
