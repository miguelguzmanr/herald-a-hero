import type { Hero, HeroId } from "../domain/hero";

export const STARTING_HERO_RANK = 1;

export function newHeroId(): HeroId {
    return crypto.randomUUID() as HeroId;
}

export function createHero(): Hero {
    return {
        id: newHeroId(),
        name: "",
        player: "",
        rank: STARTING_HERO_RANK,
    };
}
