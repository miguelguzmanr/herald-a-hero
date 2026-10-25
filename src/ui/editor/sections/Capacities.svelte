<script lang="ts">
    import { CAPACITY_IDS } from "../../../lib/domain/capacity";
    import type { Hero } from "../../../lib/domain/hero";

    let { hero }: { hero: Hero } = $props();
</script>

<section>
    <div class="grid">
        <label>
            Potential Score
            <input type="number" inputmode="numeric" min="0" bind:value={hero.potentialScore} />
        </label>
        <label>
            Core Capacity
            <select bind:value={hero.core}>
                <option value={undefined}>unset</option>
                {#each CAPACITY_IDS as id (id)}
                    <option value={id}>{id}</option>
                {/each}
            </select>
        </label>
    </div>

    <div class="grid">
        {#each CAPACITY_IDS as id (id)}
            <label>
                {id}
                <input type="number" inputmode="numeric" min="0" bind:value={hero.capacities[id]} />
            </label>
        {/each}
    </div>
</section>

<style>
    label,
    select {
        text-transform: capitalize;
    }
</style>
