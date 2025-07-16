<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import TabTriggerIcon from './TabTriggerIcon.svelte';
	import TabTriggerLabel from './TabTriggerLabel.svelte';

	export let label;
	export let logo;
	export let active = false;
	export let onClick;
</script>

<li
	class:ml-2={!$isSidebarCollapsed}
	class={`relative group text-md items-center p-2 rounded-lg ${active ? 'bg-secondary-acc/20' : 'hover:bg-secondary-acc/5'}`}
>
	<button type="button" class="flex gap-2 w-full" on:click={onClick}>
		<TabTriggerIcon {active} {logo} />
		<TabTriggerLabel {label} {isSidebarCollapsed} {active} />
	</button>
</li>
