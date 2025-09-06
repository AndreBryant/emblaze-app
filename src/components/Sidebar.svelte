<script>
	import { browser } from '$app/environment';
	import { isSidebarCollapsed, activeTabValue } from '$lib/stores/app-stores.js';
	import AppTitle from './sidebar/AppTitle.svelte';
	import Tabs from './sidebar/Tabs.svelte';
	import FileInput from './sidebar/FileInput.svelte';
	import CollapseToggle from './sidebar/CollapseToggle.svelte';

	import { Menu, X, Expand, Shrink } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	export let items = [];

	const appTitle = 'Emblaze-MIDI';
	let expanded = false;
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
<div class="flex items-center gap-2 border-b border-secondary/10 px-4 py-4 lg:hidden">
	<div class="flex h-full items-center">
		<button on:click={() => (expanded = true)}>
			<Menu
				size={24}
				class="rounded-full text-secondary-acc transition hover:bg-secondary-acc/40 hover:text-secondary-dark/70"
			/>
		</button>
	</div>
	<div class="flex items-center">
		<AppTitle label={appTitle} />
	</div>
</div>

{#if expanded}
	<!--  make bg dim -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="absolute z-10 h-screen w-screen bg-black/10 backdrop-blur-sm transition lg:hidden"
		class:translate-x-full={!expanded}
		on:click={() => (expanded = false)}
		transition:fade={{ duration: 100 }}
	/>

	<div
		class="absolute z-20 flex h-full w-64 select-none flex-col gap-8 border-r border-r-secondary-dark/10 border-opacity-30 bg-primary py-8 pl-4 transition lg:hidden"
		class:translate-x-full={!expanded}
		in:slide={{ axis: 'x', duration: 100 }}
		out:slide={{ axis: 'x', duration: 100 }}
	>
		<div class="flex items-center border-b border-secondary-acc/40 pb-3 pr-4">
			<button
				on:click={() => (expanded = false)}
				class="rounded-full transition hover:bg-secondary-acc/10"
			>
				<X size={36} class="text-secondary-acc hover:text-secondary-dark/70" />
			</button>
			<div class="grow"></div>
			<button
				on:click={() => toggleFullScreen()}
				class="flex aspect-square h-8 items-center justify-center rounded-full bg-secondary-acc/10 text-secondary-acc hover:text-secondary-dark/70"
			>
				{#if isFullScreen}
					<Shrink icon={36} />
				{:else}
					<Expand icon={36} />
				{/if}
			</button>
		</div>
		<div class="grow">
			<ul class="flex flex-col justify-end gap-1">
				{#each items as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li
						class={`text-md group relative flex w-full items-center p-2`}
						on:click={() => ($activeTabValue = item.value)}
					>
						<button
							type="button"
							class={`flex w-full items-center gap-2 py-1 pl-2 ${$activeTabValue === item.value ? ' -ml-2 border-y border-l-8 border-secondary-acc/10 border-l-secondary/40 ' : ' rounded-lg hover:bg-secondary-acc/5 '}`}
						>
							<span
								class={`icon ${$activeTabValue === item.value ? 'opacity-85' : 'opacity-55 group-hover:opacity-70'}`}
							>
								<svelte:component this={item.logo} size={24} />
							</span>
							<span
								class={`truncate font-semibold ${$activeTabValue === item.value ? 'text-md font-bold opacity-90' : 'text-sm opacity-55'}`}
							>
								{item.label}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="mx-2">
			<FileInput />
		</div>
	</div>
{/if}
