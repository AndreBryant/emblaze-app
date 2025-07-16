<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import TabTriggerIcon from './TabTriggerIcon.svelte';
	import TabTriggerLabel from './TabTriggerLabel.svelte';

	export let label;
	export let logo;
	export let active = false;
	export let onClick;
</script>

<li>
	<button
		type="button"
		class="relative group flex gap-2 text-md items-center underline-offset-4 hover:opacity-90"
		on:click={onClick}
	>
		<TabTriggerIcon {active} {logo} />
		<TabTriggerLabel {label} {isSidebarCollapsed} {active} />
	</button>
</li>
