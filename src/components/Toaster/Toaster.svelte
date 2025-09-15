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
	class="toaster pointer-events-none fixed bottom-0 right-0 flex h-96 w-full flex-col-reverse overflow-y-auto transition-all lg:bottom-auto lg:top-0 lg:w-96 lg:flex-col"
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
