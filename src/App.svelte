<script lang="ts">
    import { createSave, storeSave } from "./lib/storage";
    import { heroes } from "./state/heroes.svelte";
    import HeroEditor from "./ui/HeroEditor.svelte";
    import HeroList from "./ui/HeroList.svelte";

    $effect(() => storeSave(createSave(heroes.list)));
</script>

<header class="container">
    <h1>Herald a Hero</h1>
</header>

<main class="container">
    <p>
        An unofficial hero builder for Herald's Decree, a tabletop RPG by <a
            href="https://milestoneplay.com/"
            target="_blank"
            rel="noopener noreferrer">Milestone Play</a
        >
    </p>
    {#if heroes.selected}
        <HeroEditor hero={heroes.selected} onclose={() => (heroes.selectedId = undefined)} />
    {:else}
        <HeroList />
    {/if}
</main>
