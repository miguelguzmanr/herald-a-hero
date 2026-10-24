import type { Skill, SkillId } from "../domain/skill";

export const skills = {
    animalAffinity: {
        name: "Animal Affinity",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    brawn: {
        name: "Brawn",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    discipline: {
        name: "Discipline",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    endurance: {
        name: "Endurance",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    intimidate: {
        name: "Intimidate",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    knowledge: {
        name: "Knowledge",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    medicine: {
        name: "Medicine",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    negotiation: {
        name: "Negotiation",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    notice: {
        name: "Notice",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    spellcraft: {
        name: "Spellcraft",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    stealth: {
        name: "Stealth",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    stunts: {
        name: "Stunts",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    thievery: {
        name: "Thievery",
        description: "",
        features: [],
        specializations: [],
        combatActions: [],
    },
    wilderness: {
        name: "Wilderness",
        description:
            "The Wilderness skill represents a character's mastery of the natural world, survival in harsh conditions, and maintaining themselves on natural resources. " +
            "Each character will have a list of Terrains that they know.",
        features: [
            {
                name: "Terrain Dependent",
                description:
                    "When a Wilderness Test is made for a Terrain that you do not possess you take a Double Bane.",
            },
        ],
        specializations: [
            {
                id: "tracksAndScat",
                name: "Tracks and Scat",
                description: "Wilderness Tests made to track a creature gain a Boon.",
            },
            {
                id: "returnTrip",
                name: "Return Trip",
                description:
                    "Wilderness Tests made for the Guide role on a Journey to reach a destination you have been before gain a Boon.",
            },
        ],
        combatActions: [
            {
                id: "analyzeSurroundings",
                name: "Analyze Surroundings",
                description:
                    "Use one of your Terrains to analyze one environmental danger. If appropriate, learn 1 fact. Multiple uses may learn more information but will eventually fail.",
            },
        ],
    },
} satisfies Record<SkillId, Skill>;
