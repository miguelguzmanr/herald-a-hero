<script lang="ts">
    import { CAPACITY_NAMES } from "../lib/domain/capacity";
    import type { Hero } from "../lib/domain/hero";
    import { formatSize } from "../lib/domain/size";
    import { SKILL_IDS, SKILLS } from "../lib/domain/skill";

    let { hero }: { hero: Hero } = $props();
</script>

<aside class="hero-summary">
    <details class="container">
        <summary>{hero.name || "Unnamed hero"}</summary>
        <div class="content">
            <dl class="stats">
                <div>
                    <dt>Hero Rank</dt>
                    <dd>{hero.rank}</dd>
                </div>
                <div>
                    <dt>Size</dt>
                    <dd>{formatSize(hero.size)}</dd>
                </div>
                <div>
                    <dt>Potential Score</dt>
                    <dd>{hero.potentialScore}</dd>
                </div>
                <div>
                    <dt>Core Capacity</dt>
                    <dd>{hero.core ? CAPACITY_NAMES[hero.core] : "Unset"}</dd>
                </div>
            </dl>

            <h3>Skills</h3>
            <dl class="stats">
                {#each SKILL_IDS as id (id)}
                    <div>
                        <dt>{SKILLS[id].name}</dt>
                        <dd>{hero.skillRanks[id]}</dd>
                    </div>
                {/each}
            </dl>
        </div>
    </details>
</aside>

<style>
    :global(body:has(.hero-summary)) {
        padding-bottom: 4rem;
    }
    .hero-summary {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 10;
        background: var(--pico-card-background-color);
        box-shadow: var(--pico-box-shadow);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .hero-summary details {
        padding-block: calc(var(--pico-spacing) / 2);
        margin-bottom: 0;
    }
    .hero-summary details summary {
        font-size: 1.5rem;
        line-height: 1.175;
        font-weight: 700;
        color: var(--pico-h3-color);
        font-family: var(--app-font-family-decorative);
    }
    .hero-summary details summary::after {
        height: 1.75rem;
    }
    .hero-summary .content {
        max-height: 60dvh;
        overflow-y: auto;
    }
    .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: calc(var(--pico-spacing) / 2) var(--pico-grid-column-gap);
    }
    @media (min-width: 576px) {
        .stats {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    @media (min-width: 1024px) {
        .stats {
            grid-template-columns: repeat(6, 1fr);
        }
    }
    .stats dt {
        font-size: 0.875em;
        font-weight: normal;
        color: var(--pico-muted-color);
    }
    .stats dd {
        margin: 0;
        font-weight: 700;
    }
</style>
