/* Alphabetical order */
export const SKILL_IDS = [
    "animalAffinity",
    "brawn",
    "discipline",
    "endurance",
    "intimidate",
    "knowledge",
    "medicine",
    "negotiation",
    "notice",
    "spellcraft",
    "stealth",
    "stunts",
    "thievery",
    "wilderness",
] as const;

export type SkillId = (typeof SKILL_IDS)[number];
export type SkillRanks = Record<SkillId, number>;

export type SkillFeature = {
    name: string;
    description: string;
};

export type SkillSpecializationId = string;
export type SkillSpecialization = SkillFeature & { id: SkillSpecializationId };

export type SkillCombatActionId = string;
export type SkillCombatAction = SkillFeature & { id: SkillCombatActionId };

export type Skill = {
    name: string;
    description: string;
    features: readonly SkillFeature[];
    specializations: readonly SkillSpecialization[];
    combatActions: readonly SkillCombatAction[];
};
