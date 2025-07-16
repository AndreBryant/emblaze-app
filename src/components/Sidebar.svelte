<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import AppTitle from './sidebar/AppTitle.svelte';
	import Tabs from './sidebar/Tabs.svelte';
	import FileInput from './sidebar/FileInput.svelte';
	import CollapseToggle from './sidebar/CollapseToggle.svelte';

	export let items = [];
</script>

<div
	id="sidebar"
	class={`z-20 px-4 py-8 flex flex-col gap-10 border-r
	border-r-secondary-dark/10 border-opacity-30
	fixed h-full select-none
	${$isSidebarCollapsed ? ' w-24 items-center' : ' w-64'}`}
>
	<AppTitle label={'Emblaze'} />
	<Tabs {items} />
	<FileInput />
	<CollapseToggle />
</div>
