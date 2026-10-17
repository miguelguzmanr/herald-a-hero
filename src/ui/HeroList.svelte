<script lang="ts">
    import type { Hero } from "../lib/domain/hero";
    import { heroes } from "../state/heroes.svelte";
    import ConfirmDialog from "./helpers/ConfirmDialog.svelte";

    let heroToDelete = $state<Hero>();

    function confirmDelete(): void {
        if (heroToDelete) heroes.remove(heroToDelete.id);
        heroToDelete = undefined;
    }
</script>

<section>
    <h2>Your heroes</h2>

    <button onclick={() => heroes.create()}>Create</button>

    {#if heroes.list.length === 0}
        <p>No heroes.</p>
    {:else}
        <ul>
            {#each heroes.list as hero (hero.id)}
                <li>
                    {hero.name || "Unnamed hero"}
                    <button onclick={() => (heroes.selectedId = hero.id)}>Edit</button>
                    {#if hero.player}
                        <span>({hero.player})</span>
                    {/if}
                    <button class="secondary outline" onclick={() => (heroToDelete = hero)}
                        >Delete</button
                    >
                </li>
            {/each}
        </ul>
    {/if}

    <ConfirmDialog
        open={heroToDelete !== undefined}
        title="Confirm Delete"
        confirmLabel="Delete"
        onconfirm={confirmDelete}
        onclose={() => (heroToDelete = undefined)}
    >
        <p>
            Are you sure you want to delete <strong>{heroToDelete?.name || "this hero"}</strong>?
            This action can't be undone.
        </p>
    </ConfirmDialog>
</section>
