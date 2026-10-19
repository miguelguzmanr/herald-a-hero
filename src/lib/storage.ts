export const STORAGE_KEY = "herald-a-hero";

type Envelope = { version: number; data: unknown };

export type Slot<T> = {
    key: string;
    version: number;
    validate: (data: unknown) => data is T;
    migrate?: Record<number, (data: unknown) => unknown>;
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

function isEnvelope(data: unknown): data is Envelope {
    return (
        typeof data === "object" &&
        data !== null &&
        "version" in data &&
        typeof data.version === "number" &&
        "data" in data
    );
}

export function parse<T>(slot: Slot<T>, raw: string): T | undefined {
    try {
        const envelope: unknown = JSON.parse(raw);

        if (!isEnvelope(envelope)) return undefined;

        let { version, data } = envelope;

        while (version < slot.version) {
            const migrate = slot.migrate?.[version];

            if (!migrate) return undefined;

            data = migrate(data);

            version++;
        }

        if (version === slot.version && slot.validate(data)) return data;
    } catch {
        // TODO
    }

    return undefined;
}

export function load<T>(slot: Slot<T>): T | undefined {
    const raw = read(slot.key);

    if (raw === null) return undefined;

    const data = parse(slot, raw);

    if (data === undefined) write(`${slot.key}.backup`, raw);

    return data;
}

export function store<T>(slot: Slot<T>, data: T): void {
    const envelope: Envelope = { version: slot.version, data };
    const raw: string = JSON.stringify(envelope);
    write(slot.key, raw);
}
