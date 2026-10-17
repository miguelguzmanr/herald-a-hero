<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        open: boolean;
        title: string;
        onclose: () => void;
        children: Snippet;
        footer?: Snippet;
    };

    let { open, title, onclose, children, footer }: Props = $props();

    const id = $props.id();
    let dialog: HTMLDialogElement;

    $effect(() => {
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();

        // Prevents any scrolling and interactions below the modal
        // See: https://picocss.com/docs/modal#utilities
        const html = document.documentElement;
        html.classList.toggle("modal-is-open", open);

        if (open)
            html.style.setProperty(
                "--pico-scrollbar-width",
                `${window.innerWidth - html.clientWidth}px`,
            );

        return () => {
            html.classList.remove("modal-is-open");
            html.style.removeProperty("----pico-scrollbar-width");
        };
    });

    function closeDialog(event: MouseEvent): void {
        if (event.target === event.currentTarget) onclose();
    }
</script>

<dialog bind:this={dialog} aria-labelledby="{id}-title" {onclose} onclick={closeDialog}>
    <article>
        <header>
            <button class="close" aria-label="Close" onclick={onclose}></button>
            <h2 id="{id}-title">{title}</h2>
        </header>

        {@render children()}

        {#if footer}
            <footer>{@render footer()}</footer>
        {/if}
    </article>
</dialog>
