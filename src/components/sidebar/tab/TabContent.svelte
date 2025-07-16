<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	export let component;
	export let props = {};
	export let logo;
	export let label;

	let wStyle = '64';

	$: wStyle = $isSidebarCollapsed ? '24' : '64';
</script>

<div
	id="main-content-icon-bg"
	class={'fixed top-0 left-0 h-full flex justify-center items-center pointer-events-none ' +
		' ml-' +
		wStyle +
		' ' +
		($isSidebarCollapsed ? 'w-[calc(100vw-6rem)]' : 'w-[calc(100vw-16rem)]')}
>
	<div class="opacity-5">
		<span class="icon">
			<svelte:component this={logo} size={128} />
		</span>
		<pre class="text-center text-sm select-none">{label}</pre>
	</div>
</div>
<div class="w-full py-8 px-12 z-10 overflow-x-hidden text-wrap">
	<svelte:component this={component} {...props} />
</div>
