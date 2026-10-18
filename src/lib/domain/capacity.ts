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
