<script>
	import { toasts } from '$lib/stores/toastStore.js';
	import { afterUpdate } from 'svelte';
	import Toast from './Toast.svelte';

	let toaster;

	// scroll to the bottom when new toasts are added
	afterUpdate(() => {
		if (toaster) {
			toaster.scrollTop = toaster.scrollHeight;
		}
	});
</script>

<div
	bind:this={toaster}
	class="toaster fixed right-0 top-0 flex h-96 w-96 flex-col overflow-y-auto opacity-80 transition-all"
>
	{#each $toasts as toast}
		<Toast {toast} />
	{/each}
</div>

<style>
	.toaster::-webkit-scrollbar {
		display: none;
	}
</style>
