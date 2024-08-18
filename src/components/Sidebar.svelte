<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import { activeTabValue } from '$lib/stores/app-stores.js';
	import AppTitle from './AppTitle.svelte';
	import TabTrigger from './TabTrigger.svelte';
	import FileInput from './FileInput.svelte';
	export let items = [];

	const handleClick = (tabValue) => () => ($activeTabValue = tabValue);

	const toggleSidebar = () => {
		$isSidebarCollapsed = !$isSidebarCollapsed;
	};
</script>

<div
	id="sidebar"
	class={`p-8 flex flex-col gap-8 border-r border-r-secondary border-opacity-30 fixed h-full select-none bg-gradient-to-r from-primary from-50% to-[#010510] ${$isSidebarCollapsed ? ' w-24' : ' w-64'}`}
>
	<AppTitle label={'Emblaze MIDI'} />
	<div class="flex-grow">
		<ul class="flex flex-col gap-8 justify-center">
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
			class="border rounded-lg p-1 opacity-50 hover:opacity-100 transition-all"
			on:click={toggleSidebar}
		>
			{#if $isSidebarCollapsed}
				<ChevronRight size={18} />
			{:else}
				<ChevronLeft size={18} />
			{/if}
		</button>
	</div>
</div>
