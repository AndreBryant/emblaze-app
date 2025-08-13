<script>
	import { browser } from '$app/environment';
	import { isSidebarCollapsed, activeTabValue } from '$lib/stores/app-stores.js';
	import AppTitle from './sidebar/AppTitle.svelte';
	import Tabs from './sidebar/Tabs.svelte';
	import FileInput from './sidebar/FileInput.svelte';
	import CollapseToggle from './sidebar/CollapseToggle.svelte';

	import { Menu, X, Expand, Shrink } from 'lucide-svelte';

	export let items = [];

	const appTitle = 'Emblaze-MIDI';
	let expanded = true;
	let isFullScreen = false;

	function toggleFullScreen() {
		if (!browser) return;

		const el = document.body;

		if (document.fullscreenElement) {
			document.exitFullscreen();
			isFullScreen = false;
		} else if (el.requestFullscreen) {
			el.requestFullscreen();
			isFullScreen = true;
		}
	}
</script>

<div
	id="sidebar"
	class={`fixed z-20 hidden h-full select-none flex-col gap-8
	border-r border-r-secondary-dark/10
	border-opacity-30 py-8 lg:flex
	${$isSidebarCollapsed ? ' w-24 items-center px-4' : ' w-64 pl-4'}`}
>
	<AppTitle label={appTitle} />
	<Tabs {items} />
	<FileInput />
	<CollapseToggle />
</div>

<!-- button -->
<div class="flex items-center border-b border-secondary/10 px-4 py-4 lg:hidden">
	<div class="grow">
		<AppTitle label={appTitle} />
	</div>
	<div class="flex h-full items-end">
		<button on:click={() => (expanded = true)}>
			<Menu size={36} />
		</button>
	</div>
</div>

{#if expanded}
	<!-- whole popover -->
	<div
		class="absolute z-10 flex h-screen w-screen flex-col gap-2 bg-primary/75 px-4 pb-16 pt-4 backdrop-blur-lg transition lg:hidden"
	>
		<div class="flex">
			<button
				on:click={() => (expanded = false)}
				class="rounded-full p-1 transition hover:bg-secondary-acc/10"
			>
				<X size={36} />
			</button>
			<div class="grow"></div>
			<button
				on:click={() => toggleFullScreen()}
				class="flex aspect-square h-8 items-center justify-center rounded-full bg-secondary-acc/40"
			>
				{#if isFullScreen}
					<Shrink icon={36} />
				{:else}
					<Expand icon={36} />
				{/if}
			</button>
		</div>
		<div class="flex grow">
			<ul class="flex flex-col gap-2">
				{#each items as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li
						on:click={() => ($activeTabValue = item.value)}
						class={`flex border border-secondary-dark/40 ${$activeTabValue === item.value ? 'bg-secondary-acc/10 font-normal' : 'bg-primary/5 font-thin hover:bg-secondary-acc/5'}`}
					>
						<svelte:component this={item.logo} size="24" class="text-secondary/60" />
						{item.label}
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<FileInput />
		</div>
	</div>
{/if}
