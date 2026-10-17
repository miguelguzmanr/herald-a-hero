<script lang="ts">
    import type { Snippet } from "svelte";
    import Modal from "./Modal.svelte";

    type Props = {
        open: boolean;
        title: string;
        confirmLabel?: string;
        onconfirm: () => void;
        onclose: () => void;
        children: Snippet;
    };

    let { open, title, confirmLabel = "Confirm", onconfirm, onclose, children }: Props = $props();
</script>

<Modal {open} {title} {onclose}>
    {@render children()}

    {#snippet footer()}
        <button class="secondary" onclick={onclose}>Cancel</button>
        <button onclick={onconfirm}>{confirmLabel}</button>
    {/snippet}
</Modal>
