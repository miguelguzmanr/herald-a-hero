/* Smallest to largest */
export const SIZE_IDS = [
    "sixteenth",
    "eighth",
    "quarter",
    "half",
    "one",
    "two",
    "three",
    "four",
    "five",
] as const;

export type SizeId = (typeof SIZE_IDS)[number];

export function compareSizes(a: SizeId, b: SizeId): number {
    return SIZE_IDS.indexOf(a) - SIZE_IDS.indexOf(b);
}
