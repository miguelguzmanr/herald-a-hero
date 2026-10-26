import { createHero } from "../lib/decree/creation";
import { isHero, type Hero, type HeroId } from "../lib/domain/hero";
import { STORAGE_KEY, load, store, type Slot } from "../lib/storage";
import { isRecord } from "../lib/validations";
import { battles } from "./battles.svelte";

function withDefaults(data: unknown): unknown {
    return (data as unknown[]).map((hero) =>
        isRecord(hero) ? { ...createHero(), ...hero } : hero,
    );
}

const HEROES: Slot<Hero[]> = {
    key: `${STORAGE_KEY}/heroes`,
    version: 3,
    validate: (data): data is Hero[] => Array.isArray(data),
    migrate: {
        /** v2: adds capacities, core, and potentialScore */
        1: withDefaults,
        /** v3: adds skills and proficiencies */
        2: withDefaults,
    },
};

const SKIPPED: Slot<unknown[]> = {
    key: `${HEROES.key}.skipped`,
    version: 1,
    validate: (data): data is unknown[] => Array.isArray(data),
};

function loadHeroes(): { list: Hero[]; skipped: number } {
    const data = load(HEROES) ?? [];
    const list = data.filter(isHero);
    const skipped = data.filter((item) => !isHero(item));

    if (skipped.length > 0 && store(SKIPPED, [...(load(SKIPPED) ?? []), ...skipped])) {
        store(HEROES, list);
    }

    return { list, skipped: skipped.length };
}

const loaded = loadHeroes();

class HeroStore {
    list = $state<Hero[]>(loaded.list);
    saveFailed = $state(false);
    readonly skipped = loaded.skipped;

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
