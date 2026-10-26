import { isRecord, isStringArray, isWholeNumber } from "../validations";
import { isCapacityId, isPerCapacity, type CapacityId, type CapacityScores } from "./capacity";
import type { Proficiency } from "./proficiency";
import { isSize } from "./size";
import {
    isPerSkill,
    isSkillFeature,
    type SkillFeature,
    type SkillId,
    type SkillRanks,
} from "./skill";
import type { SkillAlterationId } from "./skill-alteration";
import type { TerrainId } from "./terrain";

export type HeroId = string;

export type Hero = {
    id: HeroId;
    name: string;
    player: string;
    rank: number;
    size: number;
    capacities: CapacityScores;
    core?: CapacityId;
    potentialScore: number;
    skillRanks: SkillRanks;
    skillSpecializations: Record<SkillId, SkillFeature[]>;
    skillAlterations: Record<SkillId, SkillAlterationId[]>;
    terrains: TerrainId[];
    lores: Proficiency[];
    languages: Proficiency[];
    crafts: Proficiency[];
    occupations: Proficiency[];
};

export function isHero(value: unknown): value is Hero {
    return (
        isRecord(value) &&
        typeof value.id === "string" &&
        typeof value.name === "string" &&
        typeof value.player === "string" &&
        isWholeNumber(value.rank) &&
        isSize(value.size) &&
        isWholeNumber(value.potentialScore) &&
        isPerCapacity(value.capacities, isWholeNumber) &&
        (value.core === undefined || isCapacityId(value.core)) &&
        isPerSkill(value.skillRanks, isWholeNumber) &&
        isPerSkill(value.skillAlterations, isStringArray) &&
        isPerSkill(
            value.skillSpecializations,
            (item): item is SkillFeature[] => Array.isArray(item) && item.every(isSkillFeature),
        ) &&
        Array.isArray(value.terrains) &&
        Array.isArray(value.lores) &&
        Array.isArray(value.languages) &&
        Array.isArray(value.crafts) &&
        Array.isArray(value.occupations)
    );
}
