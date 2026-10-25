/** Rules order */
export const CAPACITY_IDS = [
    "martial",
    "defense",
    "agility",
    "skill",
    "willpower",
    "arcana",
] as const;

export type CapacityId = (typeof CAPACITY_IDS)[number];
export type CapacityScores = Record<CapacityId, number>;

export function perCapacity<T>(value: (id: CapacityId) => T): Record<CapacityId, T> {
    return Object.fromEntries(CAPACITY_IDS.map((id) => [id, value(id)])) as Record<CapacityId, T>;
}
