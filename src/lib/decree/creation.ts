import { perCapacity } from "../domain/capacity";
import type { Hero, HeroId } from "../domain/hero";
import { perSkill } from "../domain/skill";

export const STARTING_HERO_RANK = 1;
export const STARTING_POTENTIAL_SCORE = 4;
export const MAX_SKILL_RANK = 5;

export function newHeroId(): HeroId {
    return crypto.randomUUID() as HeroId;
}

export function createHero(): Hero {
    return {
        id: newHeroId(),
        name: "",
        player: "",
        rank: STARTING_HERO_RANK,
        size: 1,
        capacities: perCapacity(() => 0),
        potentialScore: STARTING_POTENTIAL_SCORE,
        skillRanks: perSkill(() => 0),
        skillSpecializations: perSkill(() => []),
        skillAlterations: perSkill(() => []),
        terrains: [],
        lores: [],
        languages: [],
        crafts: [],
        occupations: [],
    };
}
