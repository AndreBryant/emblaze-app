<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';

	const toggleSidebar = () => {
		$isSidebarCollapsed = !$isSidebarCollapsed;
	};
</script>

<div class="absolute top-1/2 left-0">
	<button
		type="button"
		class="border border-secondary/20 bg-secondary-acc/20 rounded-lg p-1 opacity-50 hover:opacity-100 transition-all"
		on:click={toggleSidebar}
	>
		{#if $isSidebarCollapsed}
			<ChevronRight size={18} />
		{:else}
			<ChevronLeft size={18} />
		{/if}
	</button>
</div>
