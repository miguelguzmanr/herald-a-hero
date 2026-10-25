<script lang="ts">
    import type { Hero } from "../../../lib/domain/hero";
    import { formatSize, SIZES } from "../../../lib/domain/size";
    import { toWholeNumber } from "../../../lib/validations";

    let { hero }: { hero: Hero } = $props();
</script>

<section>
    <div class="grid">
        <label>
            Character
            <input type="text" bind:value={hero.name} autocomplete="off" />
        </label>

        <label>
            Player
            <input type="text" bind:value={hero.player} autocomplete="off" />
        </label>
    </div>
    <div class="grid">
        <label>
            Hero Rank
            <input
                type="number"
                inputmode="numeric"
                min="1"
                bind:value={() => hero.rank, (v) => (hero.rank = toWholeNumber(v, 1))}
            />
        </label>

        <label>
            Size
            <select bind:value={hero.size}>
                {#each SIZES as size (size)}
                    <option value={size}>{formatSize(size)}</option>
                {/each}
            </select>
        </label>
    </div>
</section>
