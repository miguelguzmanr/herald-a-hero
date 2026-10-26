import { isRecord } from "../validations";

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

export type Skill = {
    name: string;
    description: string;
    features: readonly SkillFeature[];
};

export const SKILLS = {
    animalAffinity: {
        name: "Animal Affinity",
        description: "This skill is used to interact with ordinary beasts.",
        features: [],
    },
    brawn: {
        name: "Brawn",
        description: "This skill is used to interact with the world using brute strength.",
        features: [],
    },
    discipline: {
        name: "Discipline",
        description:
            "This skill is used for mental resilience, focus, and extended monotonous tasks.",
        features: [],
    },
    endurance: {
        name: "Endurance",
        description:
            "This skill is used to weather extreme conditions such as the desert winds, river rapids, or draining illnesses.",
        features: [],
    },
    intimidate: {
        name: "Intimidate",
        description:
            "This skill is used to overpower the mental fortitude and determination of others.",
        features: [],
    },
    knowledge: {
        name: "Knowledge",
        description:
            "The Knowledge skill represents a character's mastery of information and the ability to apply what they know.",

        features: [
            {
                name: "Lore Dependent",
                description:
                    "When a Knowledge Test is made for a Lore that you do not possess you take a Double Bane.",
            },
        ],
    },
    medicine: {
        name: "Medicine",
        description:
            "This skill represents knowledge of anatomy, injuries, first aid, surgery, illnesses, and treatments.",
        features: [],
    },
    negotiation: {
        name: "Negotiation",
        description:
            "This skill represents a character’s aptitude for interacting with and winning over NPCs.",
        features: [],
    },
    notice: {
        name: "Notice",
        description: "This skill represents general awareness.",
        features: [],
    },
    spellcraft: {
        name: "Spellcraft",
        description:
            "This skill represents a level of practiced mastery of magical knowledge, the building of rituals, and insight into how to unlock magical potential from within objects and locations.",
        features: [],
    },
    stealth: {
        name: "Stealth",
        description:
            "This skill represents the ability to go unnoticed, leave no trace, and evade detection.",
        features: [],
    },
    stunts: {
        name: "Stunts",
        description:
            "This skill represents the ability to traverse difficult terrain and navigate dangerous or precarious obstacles.",
        features: [],
    },
    thievery: {
        name: "Thievery",
        description: "This skill represents an expertise in general skullduggery.",
        features: [],
    },
    wilderness: {
        name: "Wilderness",
        description:
            "The Wilderness skill represents a character’s mastery of the natural world, survival in harsh conditions, and maintaining themselves on natural resources.",
        features: [
            {
                name: "Terrain Dependent",
                description:
                    "When a Wilderness Test is made for a Terrain that you do not possess you take a Double Bane.",
            },
        ],
    },
} satisfies Record<SkillId, Skill>;

export function perSkill<T>(value: (id: SkillId) => T): Record<SkillId, T> {
    return Object.fromEntries(SKILL_IDS.map((id) => [id, value(id)])) as Record<SkillId, T>;
}

export function isSkillId(value: unknown): value is SkillId {
    return (SKILL_IDS as readonly unknown[]).includes(value);
}

export function isSkillFeature(value: unknown): value is SkillFeature {
    return (
        isRecord(value) && typeof value.name === "string" && typeof value.description === "string"
    );
}

export function isPerSkill<T>(
    value: unknown,
    guard: (item: unknown) => item is T,
): value is Record<SkillId, T> {
    return isRecord(value) && SKILL_IDS.every((id) => guard(value[id]));
}
