<script>
	export let label;
	export let logo;
	export let active = false;
	export let onClick;
</script>

<li>
	<button
		type="button"
		class={`flex gap-2 text-md items-center underline-offset-4 transition-all hover:opacity-95 ${active ? 'opacity-1 underline' : 'opacity-65'}`}
		on:click={onClick}
	>
		<span class="icon">
			<svelte:component this={logo} size={18} />
		</span>
		{label}
	</button>
</li>
