<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { Flame } from 'lucide-svelte';
	export let label;
</script>

<div class="space-y-5">
	<h1 class="flex h-12 flex-row items-end truncate text-2xl font-thin tracking-wide">
		<Flame class="text-acc-1 " size={36} />
		{#if !$isSidebarCollapsed}
			<span class="hidden lg:block">
				{label}
			</span>
		{/if}

		<span class="lg:hidden">
			{label}
		</span>
	</h1>
	<hr class="hidden border-secondary/10 lg:block" />
</div>
