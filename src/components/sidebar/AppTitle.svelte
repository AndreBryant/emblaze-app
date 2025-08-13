<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { Flame } from 'lucide-svelte';
	export let label;

	let version = 'v0.1';
</script>

<div class="space-y-5">
	<h1 class="flex h-12 flex-row items-center truncate font-thin tracking-wide">
		<Flame class="text-acc-1-dark" size={36} />
		{#if !$isSidebarCollapsed}
			<div class="hidden gap-2 lg:flex">
				<span class="text-2xl">
					{label}
				</span>
				<span class="text-xs opacity-50"> {version}</span>
			</div>
		{/if}

		<div class="flex gap-2 lg:hidden">
			<span class="text-2xl">
				{label}
			</span>
			<span class="text-xs opacity-70"> {version}</span>
		</div>
	</h1>
	<hr class="hidden border-secondary/10 lg:block" />
</div>
