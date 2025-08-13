<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	export let component;
	export let props = {};
	export let logo;
	export let label;
</script>

<div
	id="main-content-icon-bg"
	class={'pointer-events-none fixed left-1/2 top-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 items-center justify-center ' +
		($isSidebarCollapsed ? 'w-[calc(100vw-6rem)]' : 'w-[calc(100vw-16rem)]')}
>
	<div class="opacity-5">
		<span class="icon">
			<svelte:component this={logo} size={128} />
		</span>
		<pre class="select-none text-center text-sm">{label}</pre>
	</div>
</div>
<div class="z-10 w-full overflow-x-hidden text-wrap px-4 py-8 md:px-8 lg:px-12">
	<svelte:component this={component} {...props} />
</div>
