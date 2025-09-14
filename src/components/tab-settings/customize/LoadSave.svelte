<script>
	import { addToast } from '$lib/stores/toastStore.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { ids, loadedSetting } from '$lib/stores/customize-stores.js';

	const dispatch = createEventDispatcher();

	let settings;
	$: settings = ids.store;

	let selected;
	$: selected = $loadedSettingStore;

	const loadedSettingStore = loadedSetting.store;

	const handleSelect = () => {
		loadedSettingStore.set(selected);
		dispatch('loadSave', {
			id: selected
		});
		addToast(`Loaded ${selected} setting successfully.`, 'info');
	};

	const setSelected = (id) => {
		selected = id;
	};

	onMount(() => {
		dispatch('loadSave', {
			id: selected
		});
	});

	export { setSelected };
</script>

<!-- load Saved Setting -->
<div class="flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Load Saved Settings</h3>
	<div class="flex w-full items-center gap-2 text-secondary-dark lg:w-5/12">
		<pre>Selected:</pre>
		<select
			name=""
			id=""
			class="w-full border border-secondary-acc bg-primary px-2 py-1"
			bind:value={selected}
			on:change={handleSelect}
		>
			{#each $settings as setting}
				<option value={setting.id}>{setting.id}</option>
			{/each}
		</select>
	</div>
</div>
