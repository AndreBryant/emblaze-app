<script>
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import TabTriggerIcon from './TabTriggerIcon.svelte';
	import TabTriggerLabel from './TabTriggerLabel.svelte';

	export let label;
	export let logo;
	export let active = false;
	export let onClick;

	let bgStyle = '';

	$: {
		if (active) {
			if ($isSidebarCollapsed) {
				bgStyle = 'rounded-lg rounded-l-none  bg-secondary-acc/10';
			} else {
				bgStyle =
					'border-l border-y border-secondary-acc/10 bg-gradient-to-r from-secondary-acc/10 to-transparent/0 to-99%';
			}
		} else {
			bgStyle = 'rounded-lg hover:bg-secondary-acc/5';
		}
	}

	let beforeAfterStyle = '';

	$: {
		if (active && !$isSidebarCollapsed) {
			beforeAfterStyle = `
				before:content-['']
				before:absolute
				before:top-0
				before:-left-[2px]
				before:h-full
				before:w-1
				before:bg-secondary/40

				after:content-['']
				after:absolute
				after:bottom-0
				after:-right-1
				after:h-full
				after:w-1
				after:bg-primary
			`;
		} else if (active && $isSidebarCollapsed) {
			beforeAfterStyle = `
				before:content-['']
				before:absolute
				before:top-0
				before:-left-[2px]
				before:h-full
				before:w-1
				before:bg-secondary/40
			`;
		} else {
			beforeAfterStyle = '';
		}
	}
</script>

<li
	class:ml-2={!$isSidebarCollapsed}
	class={`relative group text-md items-center p-2 ${bgStyle} ${beforeAfterStyle}`}
>
	<button type="button" class="flex gap-2 w-full items-center" on:click={onClick}>
		<TabTriggerIcon {active} {logo} />
		<TabTriggerLabel {label} {isSidebarCollapsed} {active} />
	</button>
</li>
