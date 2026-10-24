import type { CapacityId } from "./capacity";
import type { ManeuverId } from "./maneuver";
import type { SkillCombatActionId, SkillId, SkillSpecializationId } from "./skill";
import type { SkillAlterationId } from "./skill-alteration";
import type { TerrainId } from "./terrain";

/** Increase a Capacity */
export type CapacityScoreGrant = {
    type: "capacityScore";
    capacity: CapacityId;
    amount: number;
    maxScore: number;
};

/** Training a Skill: Increase Proficiency Rank */
export type SkillRankGrant = {
    type: "skillRank";
    skill: SkillId;
    amount: number;
    maxRank: number;
};

/** Training a Skill: Gain a Skill Specialization */
export type SkillSpecializationGrant = {
    type: "skillSpecialization";
    specialization: SkillSpecializationId;
};

/** Training a Skill: Gain a Skill Alteration */
export type SkillAlterationGrant = {
    type: "skillAlteration";
    skill: SkillId;
    alteration: SkillAlterationId;
};

/** Training a Skill: Gain a Combat Skill Action */
export type SkillCombatActionGrant = {
    type: "skillCombatAction";
    action: SkillCombatActionId;
};

/** Gain 1 Terrain */
export type TerrainGrant = {
    type: "terrain";
    terrain: TerrainId;
};

/** Gain 1 Maneuver */
export type ManeuverGrant = {
    type: "maneuver";
    maneuver: ManeuverId;
};

// TODO:
// Gain 1 Combat Style
// Gain 1 Lore
// Increase your Occupation proficiencies
// Increase your Language proficiencies
// Increase your Crafting proficiencies
// Gain a Career Advancement
// Purchase Heritage Traits

export type Grant =
    | CapacityScoreGrant
    | SkillRankGrant
    | SkillSpecializationGrant
    | SkillAlterationGrant
    | SkillCombatActionGrant
    | TerrainGrant
    | ManeuverGrant;
