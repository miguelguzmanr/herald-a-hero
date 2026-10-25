<script lang="ts">
    import { href, router } from "../router.svelte";
    import { heroes } from "../state/heroes.svelte";

    function create(): void {
        router.go({ name: "edit", heroId: heroes.create() });
    }
</script>

<section>
    <h2 class="u-text-decorative">Your heroes</h2>

    <p><button onclick={() => create()}>Create</button></p>

    {#each heroes.list as hero (hero.id)}
        <article>
            <a class="u-text-decorative" href={href({ name: "hero", heroId: hero.id })}
                >{hero.name || "Unnamed hero"}</a
            >
            {#if hero.player}
                <small>({hero.player})</small>
            {/if}
        </article>
    {:else}
        <p>Nothing here yet.</p>
    {/each}
</section>
