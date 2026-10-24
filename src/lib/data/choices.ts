import type { Choice, ChoiceId, ChoiceOption } from "../domain/choice";
import { SKILL_IDS, type SkillId } from "../domain/skill";
import { skillAlterations } from "./skill-alterations";
import { skills } from "./skills";

function skillTrainingOptions(skill: SkillId, count: number, maxRank: number): ChoiceOption[] {
    const { specializations, combatActions } = skills[skill];
    return [
        {
            id: `${skill}.proficiency`,
            max: count,
            cost: 1,
            grants: [
                {
                    type: "skillRank",
                    skill,
                    amount: 1,
                    maxRank,
                },
            ],
        },
        ...specializations.map((s): ChoiceOption => ({
            id: `${skill}.${s.id}`,
            max: 1,
            cost: 1,
            grants: [
                {
                    type: "skillSpecialization",
                    specialization: s.id,
                },
            ],
        })),
        ...skillAlterations.map((a): ChoiceOption => ({
            id: `${skill}.${a.id}`,
            max: 1,
            cost: 1,
            grants: [
                {
                    type: "skillAlteration",
                    skill,
                    alteration: a.id,
                },
            ],
        })),
        ...combatActions.map((c): ChoiceOption => ({
            id: `${skill}.${c.id}`,
            max: 1,
            cost: 1,
            grants: [
                {
                    type: "skillCombatAction",
                    action: c.id,
                },
            ],
        })),
    ];
}

type SkillTrainingSettings = {
    skills?: readonly SkillId[];
    count?: number;
    maxRank: number;
};

export function skillTraining(
    id: ChoiceId,
    { skills: allowed = SKILL_IDS, count = 1, maxRank }: SkillTrainingSettings,
): Choice {
    return {
        id,
        name: count === 1 ? "Train a Skill" : `Train ${count} Skills`,
        limit: count,
        options: allowed.flatMap((skill) => skillTrainingOptions(skill, count, maxRank)),
    };
}
