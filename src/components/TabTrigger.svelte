<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';

	export let label;
	export let logo;
	export let active = false;
	export let onClick;
</script>

<li>
	<button
		type="button"
		class={`flex gap-2 text-md items-center underline-offset-4 transition-all hover:opacity-90 ${active ? 'opacity-90 underline' : 'opacity-55'}`}
		on:click={onClick}
	>
		<span class="icon ml-1">
			<svelte:component this={logo} size={24} />
		</span>
		{#if !$isSidebarCollapsed}
			{label}
		{/if}
	</button>
</li>
