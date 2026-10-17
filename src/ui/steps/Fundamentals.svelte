<script lang="ts">
    import type { Hero } from "../../lib/domain/hero";

    let { hero }: { hero: Hero } = $props();
</script>

<section>
    <h2>Fundamentals</h2>

    <label>
        Hero name
        <input type="text" bind:value={hero.name} autocomplete="off" />
    </label>

    <label>
        Player name
        <input type="text" bind:value={hero.player} autocomplete="off" />
    </label>
</section>
