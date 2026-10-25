export const SIZES: readonly number[] = [1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5];

export function isSize(value: unknown): value is number {
    return (SIZES as readonly unknown[]).includes(value);
}

export function formatSize(size: number): string {
    return size < 1 ? `1/${Math.round(1 / size)}` : `${size}`;
}
