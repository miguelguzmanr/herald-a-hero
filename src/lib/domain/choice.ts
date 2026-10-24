import type { CapacityId } from "./capacity";
import type { Grant } from "./grant";
import type { SkillId } from "./skill";

export type ChoiceId = string;
export type ChoiceOptionId = string;

export type ChoiceRequirement =
    | { type: "option"; choice: ChoiceId; option: ChoiceOptionId }
    | { type: "capacityScore"; capacity: CapacityId; value: number }
    | { type: "skillRank"; skill: SkillId; value: number };

export type ChoiceOption = {
    id: ChoiceOptionId;
    name?: string;
    description?: string;
    /** How many times this option can be picked within the same choice. */
    max?: number;
    /** How many points does this option cost within the same choice. */
    cost?: number;
    grants?: readonly Grant[];
    choices?: readonly Choice[];
    requires?: readonly ChoiceRequirement[];
};

export type Choice = {
    id: ChoiceId;
    name: string;
    description?: string;
    limit: number;
    options: readonly ChoiceOption[];
};
