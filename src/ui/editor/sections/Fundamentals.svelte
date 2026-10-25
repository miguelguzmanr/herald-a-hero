<script lang="ts">
    import type { Hero } from "../../../lib/domain/hero";

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
            <input type="number" inputmode="numeric" min="0" bind:value={hero.rank} />
        </label>

        <label>
            Size
            <input type="number" inputmode="numeric" min="0" bind:value={hero.size} />
        </label>
    </div>
</section>
