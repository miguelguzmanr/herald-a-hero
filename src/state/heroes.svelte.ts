import { createHero } from "../lib/decree/creation";
import type { Hero, HeroId } from "../lib/domain/hero";
import { STORAGE_KEY, load, store, type Slot } from "../lib/storage";

const HEROES: Slot<Hero[]> = {
    key: `${STORAGE_KEY}/heroes`,
    version: 1,
    validate: (data): data is Hero[] => Array.isArray(data),
};

class HeroStore {
    list = $state<Hero[]>([...(load(HEROES) ?? [])]);
    selectedId = $state<HeroId>();
    selected = $derived(this.list.find((hero) => hero.id === this.selectedId));

    create(): void {
        const hero = createHero();
        this.list.push(hero);
        this.selectedId = hero.id;
    }

    remove(id: HeroId): void {
        this.list = this.list.filter((hero) => hero.id !== id);
        if (this.selectedId === id) this.selectedId = undefined;
    }

    save(): void {
        store(HEROES, this.list);
    }
}

export const heroes = new HeroStore();
