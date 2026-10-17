import { createHero } from "../lib/decree/creation";
import type { Hero, HeroId } from "../lib/domain/hero";
import { loadSave } from "../lib/storage";

class HeroStore {
    list = $state<Hero[]>([...(loadSave()?.heroes ?? [])]);
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
}

export const heroes = new HeroStore();
