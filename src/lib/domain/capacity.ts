import { isRecord } from "../validations";

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

export const CAPACITY_NAMES: Record<CapacityId, string> = {
    martial: "Martial",
    defense: "Defense",
    agility: "Agility",
    skill: "Skill",
    willpower: "Willpower",
    arcana: "Arcana",
};

export function perCapacity<T>(value: (id: CapacityId) => T): Record<CapacityId, T> {
    return Object.fromEntries(CAPACITY_IDS.map((id) => [id, value(id)])) as Record<CapacityId, T>;
}

export function isCapacityId(value: unknown): value is CapacityId {
    return (CAPACITY_IDS as readonly unknown[]).includes(value);
}

export function isPerCapacity<T>(
    value: unknown,
    guard: (item: unknown) => item is T,
): value is Record<CapacityId, T> {
    return isRecord(value) && CAPACITY_IDS.every((id) => guard(value[id]));
}
