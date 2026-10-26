export type SkillAlterationId = string;
export type SkillAlteration = {
    id: SkillAlterationId;
    name: string;
    cost: number;
    description: string;
};

export const SKILL_ALTERATIONS = [
    {
        id: "reckless",
        name: "Reckless",
        cost: 3,
        description:
            "You guarantee success on a Test at the detriment to your safety. If you face Defeat on the Skill Test, you instead gain Progress. However, the situation also worsens whether the complication is immediate or further spanning. Note: Due to the large penalty on this alteration, it is intended to guarantee Progress on Advanced and Extreme Tests. While it can be used on a Basic Test, there are fewer situations where Reckless is the safer gamble.",
    },
    {
        id: "careful",
        name: "Careful",
        cost: 2,
        description:
            "You ensure the safety of the task. If you face Defeat on the skill test, the overall situation remains as if an attempt had not been made. If the skill test was under time pressure, a new attempt may not be able to be made. If there was no situational pressure, another attempt may not be made until all other players have had the spotlight.",
    },
    {
        id: "rushed",
        name: "Rushed",
        cost: 2,
        description:
            "You complete the task in a much shorter time than it otherwise should be completed in. When the situation dictates that your character would not have time to perform the described task, you may attempt it anyways. On a Defeat, the GM decides if the task is not completed in time or if the character believes the task to be completed and begins the next step before learning that shortcuts have consequences. Upon deciding to use the Rushed Alteration, all other aspects of the scene should be examined before the test is made. This will allow the GM to immediately narrate the interruption or the false success followed by harsh reality.",
    },
] satisfies readonly SkillAlteration[];
