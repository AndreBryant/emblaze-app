<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { activeTabValue } from '$lib/stores/app-stores.js';

	import TabContent from './sidebar/tab/TabContent.svelte';

	export let items = [];
</script>

<div
	id="main-content"
	class={`flex-grow ${$isSidebarCollapsed ? ' ml-24' : ' ml-64'} relative overflow-y-auto`}
>
	{#each items as item}
		{#if $activeTabValue === item.value}
			<TabContent component={item.component} label={item.label} logo={item.logo} />
			{$isSidebarCollapsed ? ' ' : ''}
		{/if}
	{/each}
</div>
