<script lang="ts">
    import { MAX_SKILL_RANK } from "../../../lib/decree/creation";
    import type { Hero } from "../../../lib/domain/hero";
    import { SKILL_IDS, SKILLS } from "../../../lib/domain/skill";
    import { SKILL_ALTERATIONS } from "../../../lib/domain/skill-alteration";
    import { toWholeNumber } from "../../../lib/validations";

    let { hero }: { hero: Hero } = $props();
</script>

<section class="skills">
    {#each SKILL_IDS as id (id)}
        <fieldset>
            <label>
                {SKILLS[id].name}
                <input
                    type="number"
                    inputmode="numeric"
                    min="0"
                    max={MAX_SKILL_RANK}
                    bind:value={
                        () => hero.skillRanks[id],
                        (v) => (hero.skillRanks[id] = toWholeNumber(v, 0, MAX_SKILL_RANK))
                    }
                />
            </label>

            <div class="alterations">
                {#each SKILL_ALTERATIONS as alteration (alteration.id)}
                    <label>
                        <input
                            type="checkbox"
                            value={alteration.id}
                            aria-label="{SKILLS[id].name} {alteration.name}"
                            bind:group={hero.skillAlterations[id]}
                        />{alteration.name}
                    </label>
                {/each}
            </div>
        </fieldset>
    {/each}
</section>

<style>
    .skills {
        display: grid;
        gap: 0 var(--pico-grid-column-gap);
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 576px) {
        .skills {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (min-width: 1024px) {
        .skills {
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>
