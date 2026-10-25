<script lang="ts">
    import { CAPACITY_IDS } from "../../lib/domain/capacity";
    import type { Hero } from "../../lib/domain/hero";
    import { battles } from "../../state/battles.svelte";
    import ConfirmDialog from "../helpers/ConfirmDialog.svelte";

    let { hero }: { hero: Hero } = $props();

    const battle = $derived(battles.state(hero));

    let confirmingReset = $state(false);

    function confirmReset(): void {
        battles.reset(hero);
        confirmingReset = false;
    }
</script>

<section>
    <h2>Battle Scene</h2>

    <article>
        <header>
            <strong>{battles.started(hero) ? `Round ${battle.round}` : "Not started"}</strong>
        </header>
        <label>
            <strong>Potential</strong>: {battle.potential}/{hero.potentialScore}
            <progress value={battle.potential} max={hero.potentialScore}></progress>
        </label>
        <p class="u-text-muted">
            At the start of each round, gain {hero.potentialScore} Potential
            {#if hero.core}
                and 1 <span class="u-text-titlecase">{hero.core}</span> Momentum
            {/if}
        </p>
        {#if !hero.core}
            <p>Core Capacity is not set.</p>
        {/if}
        <footer>
            <div class="grid">
                <button onclick={() => battles.nextRound(hero)}>
                    {battles.started(hero) ? "Next Round" : "Start"}
                </button>
                <button
                    class="secondary"
                    disabled={!battles.canUndo(hero)}
                    onclick={() => battles.undo(hero)}
                >
                    Undo
                </button>
                <button class="secondary outline" onclick={() => (confirmingReset = true)}>
                    Reset</button
                >
            </div>
        </footer>
    </article>
</section>

<div class="capacities">
    {#each CAPACITY_IDS as id (id)}
        <article>
            <header>
                {hero.capacities[id]}
                <strong class="u-text-decorative u-text-titlecase">{id}</strong>
                {#if id === hero.core}<mark>Core</mark>{/if}
            </header>

            <label>
                <strong>Potential Capacity</strong>:
                {battle.spent[id].potential}/{hero.capacities[id]}
                <progress value={battle.spent[id].potential} max={hero.capacities[id]}></progress>
            </label>

            <label>
                <strong>Momentum Capacity</strong>:
                {battle.spent[id].momentum}/{hero.capacities[id]}
                <strong>Stored:</strong>
                {battle.momentum[id]}/{hero.capacities[id]}
                <progress value={battle.spent[id].momentum} max={hero.capacities[id]}></progress>
            </label>

            <footer>
                <p class="grid">
                    <button
                        disabled={!battles.canSpendPotential(hero, id)}
                        onclick={() => battles.spendPotential(hero, id)}>Spend Potential</button
                    >
                </p>
                <p class="grid">
                    <button
                        disabled={!battles.canSpendMomentum(hero, id)}
                        onclick={() => battles.spendMomentum(hero, id)}>Spend Momentum</button
                    >
                </p>
                <p class="grid">
                    <button
                        disabled={!battles.canGainMomentum(hero, id)}
                        onclick={() => battles.gainMomentum(hero, id)}>Gain Momentum</button
                    >
                </p>
            </footer>
        </article>
    {/each}
</div>

<ConfirmDialog
    open={confirmingReset}
    title="Reset battle?"
    confirmLabel="Reset"
    onconfirm={confirmReset}
    onclose={() => (confirmingReset = false)}
>
    <p>Clears the round, Potential, Momentum, spending, and undo history for this hero.</p>
</ConfirmDialog>

<style>
    .capacities {
        display: grid;
        gap: var(--pico-grid-row-gap) var(--pico-grid-column-gap);
        margin-bottom: var(--pico-block-spacing-vertical);
    }

    @media (min-width: 768px) {
        .capacities {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
