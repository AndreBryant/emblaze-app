<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { Flame } from 'lucide-svelte';
	export let label;
</script>

<div>
	<h1 class="text-2xl flex flex-row items-center gap-2 truncate">
		<Flame class="text-acc-1 " size={32} />
		{#if !$isSidebarCollapsed}
			{label}
		{/if}
	</h1>
</div>
