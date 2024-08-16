<script>
	export let component;
	export let props = {};
	export let logo;
</script>

<div class="absolute top-0 left-0 h-full w-full flex justify-center items-center">
	<div class="opacity-10">
		<span class="icon">
			<svelte:component this={logo} size={128} />
		</span>
	</div>
</div>
<div class="h-full w-full p-8">
	<svelte:component this={component} {...props} />
</div>
