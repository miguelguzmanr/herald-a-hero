import type { CapacityId } from "../domain/capacity";
import type { Hero, HeroId } from "../domain/hero";

export const STARTING_HERO_RANK = 1;

export const MAX_STARTING_CAPACITY = 3;

export const STARTING_SKILL_RANK = 0;
export const MAX_STARTING_SKILL_RANK = 3;
export const MAX_SKILL_RANK = 5;

export const COMBAT_SKILL_ACTION_CAPACITY = "skill" satisfies CapacityId;
export const COMBAT_SKILL_ACTION_COST = 1;

export function newHeroId(): HeroId {
    return crypto.randomUUID() as HeroId;
}

export function createHero(): Hero {
    return {
        id: newHeroId(),
        name: "",
        player: "",
        rank: STARTING_HERO_RANK,
        choices: {},
    };
}
