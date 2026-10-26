<script lang="ts">
    import type { Hero } from "../../lib/domain/hero";
    import Capacities from "./sections/Capacities.svelte";
    import Fundamentals from "./sections/Fundamentals.svelte";
    import Skills from "./sections/Skills.svelte";

    let { hero }: { hero: Hero } = $props();
</script>

<section>
    <h2>Edit Hero</h2>

    <details name="hero" open>
        <summary>Fundamentals</summary>
        <Fundamentals {hero} />
    </details>
    <details name="hero">
        <summary>Capacities</summary>
        <Capacities {hero} />
    </details>
    <details name="hero">
        <summary>Skill Training</summary>
        <Skills {hero} />
    </details>
    <details name="hero">
        <summary>Proficiencies</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Inventory</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Battle</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Journey</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Montage</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Respite</summary>
        <p>Work in progress.</p>
    </details>
    <details name="hero">
        <summary>Skirmish</summary>
        <p>Work in progress.</p>
    </details>
</section>

<style>
    details summary {
        font-size: 1.5rem;
        line-height: 1.175;
        font-weight: 700;
        color: var(--pico-h3-color);
        font-family: var(--app-font-family-decorative);
    }
</style>
