import { isRecord, isWholeNumber } from "../validations";

export type ProficiencyId = string;
export type Proficiency = {
    id: ProficiencyId;
    name: string;
    rank?: number;
};

export const LANGUAGE_RANK_NAMES = ["Broken", "Limited", "Fluent", "Nuanced", "Erudite"] as const;

/** Craft and Occupation */
export const CRAFT_RANK_NAMES = [
    "Novice",
    "Apprentice",
    "Journeyman",
    "Master",
    "Grandmaster",
] as const;

export function isProficiency(value: unknown): value is Proficiency {
    return (
        isRecord(value) &&
        typeof value.id === "string" &&
        typeof value.name === "string" &&
        (value.rank === undefined || isWholeNumber(value.rank))
    );
}
