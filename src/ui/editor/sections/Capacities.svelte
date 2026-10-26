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

    <div class="grid">
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
    </div>
</section>
