import { perCapacity, type CapacityId, type CapacityScores } from "../lib/domain/capacity";
import type { Hero, HeroId } from "../lib/domain/hero";
import { STORAGE_KEY, load, store, type Slot } from "../lib/storage";

const HISTORY_LIMIT = 100;

type Spent = { potential: number; momentum: number };

type BattleState = {
    round: number;
    potential: number;
    momentum: CapacityScores;
    spent: Record<CapacityId, Spent>;
};

type Battle = { state: BattleState; history: BattleState[] };

const BATTLES: Slot<Record<HeroId, Battle>> = {
    key: `${STORAGE_KEY}/battles`,
    version: 1,
    validate: (data): data is Record<HeroId, Battle> =>
        typeof data === "object" && data !== null && !Array.isArray(data),
};

function createBattleState(): BattleState {
    return {
        round: 0,
        potential: 0,
        momentum: perCapacity(() => 0),
        spent: perCapacity(() => ({ potential: 0, momentum: 0 })),
    };
}

const NOT_STARTED = createBattleState();

class BattleStore {
    #battles = $state<Record<HeroId, Battle>>(load(BATTLES) ?? {});

    state(hero: Hero): BattleState {
        return this.#battles[hero.id]?.state ?? NOT_STARTED;
    }

    started(hero: Hero): boolean {
        return this.state(hero).round > 0;
    }

    canUndo(hero: Hero): boolean {
        return (this.#battles[hero.id]?.history.length ?? 0) > 0;
    }

    canSpendPotential(hero: Hero, id: CapacityId): boolean {
        const { potential, spent } = this.state(hero);
        return potential > 0 && spent[id].potential < hero.capacities[id];
    }

    canSpendMomentum(hero: Hero, id: CapacityId): boolean {
        const { momentum, spent } = this.state(hero);
        return momentum[id] > 0 && spent[id].momentum < hero.capacities[id];
    }

    canGainMomentum(hero: Hero, id: CapacityId): boolean {
        const { momentum } = this.state(hero);
        return this.canSpendPotential(hero, id) && momentum[id] < hero.capacities[id];
    }

    spendPotential(hero: Hero, id: CapacityId): void {
        if (!this.canSpendPotential(hero, id)) return;
        const state = this.#record(hero);
        state.potential--;
        state.spent[id].potential++;
    }

    spendMomentum(hero: Hero, id: CapacityId): void {
        if (!this.canSpendMomentum(hero, id)) return;
        const state = this.#record(hero);
        state.momentum[id]--;
        state.spent[id].momentum++;
    }

    gainMomentum(hero: Hero, id: CapacityId): void {
        if (!this.canGainMomentum(hero, id)) return;
        const state = this.#record(hero);
        state.potential--;
        state.spent[id].potential++;
        state.momentum[id]++;
    }

    nextRound(hero: Hero): void {
        const state = this.#record(hero);
        const core = hero.core;
        state.round++;
        state.potential = Math.max(0, hero.potentialScore || 0);
        state.momentum = perCapacity((id) => Math.min(state.momentum[id], hero.capacities[id]));
        if (core) state.momentum[core] = Math.min(state.momentum[core] + 1, hero.capacities[core]);
        state.spent = perCapacity(() => ({ potential: 0, momentum: 0 }));
    }

    undo(hero: Hero): void {
        const battle = this.#battles[hero.id];
        const previous = battle?.history.pop();
        if (battle && previous) battle.state = previous;
    }

    reset(hero: Hero): void {
        delete this.#battles[hero.id];
    }

    remove(id: HeroId): void {
        delete this.#battles[id];
    }

    save(): void {
        store(BATTLES, this.#battles);
    }

    #record(hero: Hero): BattleState {
        const battle = (this.#battles[hero.id] ??= { state: createBattleState(), history: [] });
        battle.history.push($state.snapshot(battle.state));
        if (battle.history.length > HISTORY_LIMIT) battle.history.shift();
        return battle.state;
    }
}

export const battles = new BattleStore();
