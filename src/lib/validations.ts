export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isWholeNumber(value: unknown): value is number {
    return Number.isInteger(value) && (value as number) >= 0;
}

export function toWholeNumber(value: unknown, min = 0): number {
    return typeof value === "number" && Number.isFinite(value)
        ? Math.max(min, Math.trunc(value))
        : min;
}
