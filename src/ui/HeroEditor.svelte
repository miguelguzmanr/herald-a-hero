<script lang="ts">
    import type { Hero } from "../lib/domain/hero";
    import Fundamentals from "./steps/Fundamentals.svelte";

    let { hero, onclose }: { hero: Hero; onclose: () => void } = $props();
</script>

<nav>
    <button class="secondary" onclick={onclose}>Back to the List of Heroes</button>
</nav>

<Fundamentals {hero} />
