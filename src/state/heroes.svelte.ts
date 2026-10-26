import { createHero } from "../lib/decree/creation";
import type { Hero, HeroId } from "../lib/domain/hero";
import { STORAGE_KEY, load, store, type Slot } from "../lib/storage";
import { battles } from "./battles.svelte";

const HEROES: Slot<Hero[]> = {
    key: `${STORAGE_KEY}/heroes`,
    version: 3,
    validate: (data): data is Hero[] => Array.isArray(data),
    migrate: {
        /** v2: adds capacities, core, and potentialScore */
        1: (data) => (data as Hero[]).map((hero) => ({ ...createHero(), ...hero })),
        /** v3: adds skills and proficiencies */
        2: (data) => (data as Hero[]).map((hero) => ({ ...createHero(), ...hero })),
    },
};

class HeroStore {
    list = $state<Hero[]>([...(load(HEROES) ?? [])]);
    saveFailed = $state(false);

    find(id: HeroId): Hero | undefined {
        return this.list.find((hero) => hero.id === id);
    }

    create(): HeroId {
        const hero = createHero();
        this.list.push(hero);

        return hero.id;
    }

    remove(id: HeroId): void {
        this.list = this.list.filter((hero) => hero.id !== id);
        battles.remove(id);
    }

    save(): void {
        this.saveFailed = !store(HEROES, this.list);
    }
}

export const heroes = new HeroStore();
