<script>
	import TabTrigger from './tab/TabTrigger.svelte';
	import { activeTabValue } from '$lib/stores/app-stores.js';

	export let items;

	const handleClick = (tabValue) => () => ($activeTabValue = tabValue);
</script>

<div class="flex-grow">
	<ul class="flex flex-col gap-6 justify-center">
		{#each items as item}
			<TabTrigger
				logo={item.logo}
				label={item.label}
				active={$activeTabValue === item.value}
				onClick={handleClick(item.value)}
			/>
		{/each}
	</ul>
</div>
