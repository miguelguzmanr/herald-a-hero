<script lang="ts">
    import { CAPACITY_IDS, CAPACITY_NAMES } from "../../../lib/domain/capacity";
    import type { Hero } from "../../../lib/domain/hero";
    import { toWholeNumber } from "../../../lib/validations";

    let { hero }: { hero: Hero } = $props();
</script>

<section>
    <div class="grid">
        <label>
            Potential Score
            <input
                type="number"
                inputmode="numeric"
                min="0"
                bind:value={
                    () => hero.potentialScore, (v) => (hero.potentialScore = toWholeNumber(v))
                }
            />
        </label>
        <label>
            Core Capacity
            <select bind:value={hero.core}>
                <option value={undefined}>Unset</option>
                {#each CAPACITY_IDS as id (id)}
                    <option value={id}>{CAPACITY_NAMES[id]}</option>
                {/each}
            </select>
        </label>
    </div>
</section>
<section class="capacities">
    {#each CAPACITY_IDS as id (id)}
        <label>
            {CAPACITY_NAMES[id]}
            <input
                type="number"
                inputmode="numeric"
                min="0"
                bind:value={
                    () => hero.capacities[id], (v) => (hero.capacities[id] = toWholeNumber(v))
                }
            />
        </label>
    {/each}
</section>

<style>
    .capacities {
        display: grid;
        gap: 0 var(--pico-grid-column-gap);
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 576px) {
        .capacities {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
