<script lang="ts">
    import type { Hero } from "../lib/domain/hero";
    import { SCENE_IDS } from "../lib/domain/scene";
    import { href, router } from "../router.svelte";
    import { heroes } from "../state/heroes.svelte";
    import ConfirmDialog from "./helpers/ConfirmDialog.svelte";

    let { hero }: { hero: Hero } = $props();

    let isConfirmingDelete = $state(false);

    function confirmDelete(): void {
        router.go({ name: "home" });
        heroes.remove(hero.id);
    }
</script>

<section>
    <h2>{hero.name || "Unnamed hero"}</h2>
    <ul class="u-text-serif">
        <li>Player: <strong>{hero.player}</strong></li>
        <li>Hero Rank: <strong>{hero.rank}</strong></li>
        <li>Pathways:</li>
        <li>Ancestry:</li>
        <li>Upbringing:</li>
        <li>Community:</li>
        <li>Size: <strong>{hero.size}</strong></li>
        <li>Potential Score: <strong>{hero.potentialScore}</strong></li>
        <li>Advancement Points: <strong>0</strong></li>
    </ul>
    <p class="grid">
        <a role="button" class="secondary" href={href({ name: "edit", heroId: hero.id })}>Edit</a>
        <button class="secondary outline" onclick={() => (isConfirmingDelete = true)}>Delete</button
        >
    </p>
</section>

<section>
    <h3>Scenes</h3>

    <div class="grid">
        {#each SCENE_IDS as scene (scene)}
            <a
                role="button"
                class="u-text-titlecase"
                href={href({ name: "scene", heroId: hero.id, scene })}>{scene}</a
            >
        {/each}
    </div>
</section>

<ConfirmDialog
    open={isConfirmingDelete}
    title="Delete hero?"
    confirmLabel="Delete"
    onconfirm={confirmDelete}
    onclose={() => (isConfirmingDelete = false)}
>
    <p class="u-text-serif">
        Are you sure you want to delete <strong>{hero.name || "Unnamed hero"}</strong>?
        <br />This action can't be undone.
    </p>
</ConfirmDialog>
