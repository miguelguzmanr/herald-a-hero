import type { CapacityId, CapacityScores } from "./capacity";

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
    // skills: SkillRanks;
};
