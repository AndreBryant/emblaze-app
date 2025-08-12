<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { activeTabValue } from '$lib/stores/app-stores.js';
	import Header from './Header/Header.svelte';

	import TabContent from './sidebar/tab/TabContent.svelte';

	export let items = [];
</script>

<div
	id="main-content"
	class={`flex-grow ${$isSidebarCollapsed ? ' lg:ml-24' : ' lg:ml-64'} relative overflow-y-auto`}
>
	{#each items as item}
		{#if $activeTabValue === item.value}
			<Header title={item.label} subtitle={item.subtitle} />
			<TabContent component={item.component} label={item.label} logo={item.logo} />
		{/if}
	{/each}
</div>
