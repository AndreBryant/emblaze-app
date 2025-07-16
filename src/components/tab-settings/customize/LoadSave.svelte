<script>
	import { createEventDispatcher } from 'svelte';
	import { ids, loadedSetting } from '$lib/stores/customize-stores.js';

	const dispatch = createEventDispatcher();

	let settings;
	$: settings = ids.store;

	let selected = 'default';
	let loadedSettingStore;
	$: loadedSettingStore = loadedSetting.store;

	const handleSelect = () => {
		$loadedSettingStore = selected;
		dispatch('loadSave', {
			id: selected
		});
	};

	const setSelected = (id) => {
		selected = id;
	};

	export { setSelected };
</script>

<!-- load Saved Setting -->
<div class="flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Load Saved Settings</h3>
	<div class="flex gap-2 items-center w-full lg:w-5/12 text-secondary-dark">
		<pre>Selected:</pre>
		<select
			name=""
			id=""
			class="bg-primary border border-secondary-acc px-2 py-1 w-full"
			bind:value={selected}
			on:change={handleSelect}
		>
			{#each $settings as id, index}
				<option value={id}>{id}</option>
			{/each}
		</select>
	</div>
</div>
