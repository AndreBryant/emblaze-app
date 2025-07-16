<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { Flame } from 'lucide-svelte';
	export let label;
</script>

<div class="space-y-4">
	<h1 class="h-12 text-2xl tracking-wide font-bold flex flex-row items-center gap-1 truncate">
		<Flame class="text-acc-1 " size={36} />
		{#if !$isSidebarCollapsed}
			{label}
		{/if}
	</h1>
	<hr class="border-secondary/20" />
</div>
