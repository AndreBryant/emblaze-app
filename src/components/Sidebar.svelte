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
	class={`z-20 py-8 flex flex-col gap-8 border-r
	border-r-secondary-dark/10 border-opacity-30
	fixed h-full select-none
	${$isSidebarCollapsed ? ' w-24 items-center px-4' : ' w-64 pl-4'}`}
>
	<AppTitle label={'Emblaze'} />
	<Tabs {items} />
	<FileInput />
	<CollapseToggle />
</div>
