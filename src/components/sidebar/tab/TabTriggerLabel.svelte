<script>
	export let label = '';
	export let active;
	export let isSidebarCollapsed;
</script>

{#if !$isSidebarCollapsed}
	<span
		class={`truncate font-semibold ${active ? 'opacity-90 font-bold text-md' : 'opacity-55 text-sm'}`}
	>
		{label}
	</span>
{:else}
	<span
		class="absolute hidden top-1/2 -translate-y-1/2 left-12 w-max text-sm font-mono px-4 py-2 rounded-lg bg-primary border border-secondary-dark/10 group-hover:block"
		>{label}</span
	>
{/if}
