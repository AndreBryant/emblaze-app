<script>
	import { removeToast } from '$lib/stores/toastStore.js';
	import { Info, CircleCheck, CircleX, CircleAlert, Box } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let toast = null;
	let isExiting = false;

	function startExit() {
		isExiting = true;
		setTimeout(() => removeToast(toast.id), 100);
	}

	onMount(() => {
		setTimeout(startExit, toast.duration);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="toast pointer-events-auto flex w-full cursor-pointer items-center gap-4 rounded-lg border border-slate-50/20 bg-primary/20 p-4 backdrop-blur-sm hover:bg-secondary/5"
	class:exiting={isExiting}
	on:click={startExit}
>
	<div class="">
		{#if toast.type === 'info'}
			<Info class="text-acc-1-light" />
		{:else if toast.type === 'success'}
			<CircleCheck class="text-green-600" />
		{:else if toast.type === 'fail'}
			<CircleX class="text-red-600" />
		{:else if toast.type === 'warning'}
			<CircleAlert class="text-red-600" />
		{:else if toast.type === 'render'}
			<Box class="text-acc-1-light" />
		{/if}
	</div>
	<div>
		<p class="text-wrap text-sm">
			{toast.message}
		</p>
	</div>
</div>

<style>
	.exiting {
		animation: slideIn;
		animation-duration: 0.1s;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}

	@keyframes slideIn {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(10%);
		}
	}
</style>
