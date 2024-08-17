<script>
	import { isSideBarCollapsed } from '$lib/stores/app-stores.js';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import { activeTabValue } from '$lib/stores/app-stores.js';
	import AppTitle from './AppTitle.svelte';
	import TabTrigger from './TabTrigger.svelte';
	import TabContent from './TabContent.svelte';
	import FileInput from './FileInput.svelte';
	export let items = [];

	let wStyle = '64';
	$: wStyle = $isSideBarCollapsed ? '24' : '64';

	const handleClick = (tabValue) => () => ($activeTabValue = tabValue);

	const toggleSidebar = () => {
		$isSideBarCollapsed = !$isSideBarCollapsed;
	};
</script>

<div class="flex flex-row w-full relative">
	<div
		class={`p-8 flex flex-col gap-8 border-r border-r-secondary border-opacity-30 fixed h-full select-none bg-gradient-to-r from-primary from-50% to-[#050509] w-${wStyle}`}
	>
		<AppTitle label={'Emblaze App'} />
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
		<div class="">
			<FileInput />
		</div>
		<div class="fixed top-1/2 left-8">
			<button
				type="button"
				class="border hover:bg-secondary-dark hover:text-primary rounded-lg p-1"
				on:click={toggleSidebar}
			>
				{#if $isSideBarCollapsed}
					<ChevronRight />
				{:else}
					<ChevronLeft />
				{/if}
			</button>
		</div>
	</div>

	<div id="#lookforthis" class={`flex-grow ml-${wStyle} relative overflow-y-auto`}>
		{#each items as item}
			{#if $activeTabValue === item.value}
				<TabContent component={item.component} label={item.label} logo={item.logo} />
				{$isSideBarCollapsed ? ' ' : ''}
			{/if}
		{/each}
	</div>
</div>
