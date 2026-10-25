<script lang="ts">
    import { href, router } from "./router.svelte";
    import { battles } from "./state/battles.svelte";
    import { heroes } from "./state/heroes.svelte";
    import HeroEditor from "./ui/editor/HeroEditor.svelte";
    import HeroList from "./ui/HeroList.svelte";
    import HeroProfile from "./ui/HeroProfile.svelte";
    import BattleScene from "./ui/scenes/BattleScene.svelte";

    const route = $derived(router.route);
    const hero = $derived(route.name === "home" ? undefined : heroes.find(route.heroId));

    $effect(() => heroes.save());
    $effect(() => battles.save());
</script>

<header class="container">
    <hgroup>
        <h1 class="u-text-decorative">Herald a Hero</h1>
        <p class="u-text-serif">
            An unofficial hero builder for <span class="u-text-decorative">Herald's Decree</span>, a
            tabletop RPG by
            <a href="https://milestoneplay.com/" target="_blank" rel="noopener noreferrer"
                >Milestone Play</a
            >
        </p>
    </hgroup>
    {#if hero}
        <nav aria-label="breadcrumb">
            <ul>
                <li>
                    <a href={href({ name: "home" })}>Heroes</a>
                </li>
                <li>
                    <a href={href({ name: "hero", heroId: hero.id })}
                        >{hero.name || "Unnamed hero"}</a
                    >
                </li>
                {#if route.name === "edit"}
                    <li>Edit</li>
                {:else if route.name === "scene"}
                    <li class="u-text-titlecase">{route.scene}</li>
                {/if}
            </ul>
        </nav>
    {/if}
</header>

<main class="container">
    {#if !hero}
        <HeroList />
    {:else if route.name === "hero"}
        <HeroProfile {hero} />
    {:else if route.name === "edit"}
        <HeroEditor {hero} />
    {:else if route.name === "scene" && route.scene === "battle"}
        <BattleScene {hero} />
    {:else}
        <p>Not found.</p>
    {/if}
</main>

<footer class="container">
    <small>
        Built with <a href="https://picocss.com">Pico CSS</a> ·
        <a href="https://github.com/miguelguzmanr/herald-a-hero">Source Code</a>
    </small>
</footer>
