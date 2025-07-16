<script>
	export let active;
	export let logo;
</script>

<span class={`icon ${active ? 'opacity-85' : 'opacity-55 group-hover:opacity-70'}`}>
	<svelte:component this={logo} size={24} />
</span>
