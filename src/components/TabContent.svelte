<script>
	export let component;
	export let props = {};
	export let logo;
	export let label;
</script>

<div class="absolute top-0 left-0 h-full w-full flex justify-center items-center">
	<div class="opacity-10">
		<span class="icon">
			<svelte:component this={logo} size={128} />
		</span>
		<pre class="text-center text-sm select-none">{label}</pre>
	</div>
</div>
<div class="h-full w-full p-8">
	<svelte:component this={component} {...props} />
</div>
