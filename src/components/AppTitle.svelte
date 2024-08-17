<script>
	import { isSideBarCollapsed } from '$lib/stores/app-stores.js';
	import { Flame } from 'lucide-svelte';
	export let label;
</script>

<div>
	<h1 class="text-2xl flex flex-row items-center gap-2">
		<Flame class="text-acc-1-light " size={32} />
		{#if !$isSideBarCollapsed}
			{label}
		{/if}
	</h1>
</div>
