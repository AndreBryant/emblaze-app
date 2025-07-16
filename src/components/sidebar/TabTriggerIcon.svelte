<script>
	export let active;
	export let logo;
</script>

<span class={`icon ml-1 ${active ? 'opacity-86' : 'opacity-55'}`}>
	<svelte:component this={logo} size={24} />
</span>
