<script>
	export let component;
	export let props = {};
</script>

<div class="h-full w-full p-8">
	<svelte:component this={component} {...props} />
</div>
