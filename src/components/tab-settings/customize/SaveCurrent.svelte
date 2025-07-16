<script>
	import { browser } from '$app/environment';
	import { hasError, ids } from '$lib/stores/customize-stores.js';
	import { createEventDispatcher } from 'svelte';
	import { Triangle, TriangleAlert } from 'lucide-svelte';
	import Button from '../../Buttons/Button.svelte';

	let idStore;
	let itemField = ids.itemField;

	$: idStore = ids.store;

	const dispatch = createEventDispatcher();

	let name = '';
	const errMsg = 'Error: (Save Settings) Name for a setting cannot be blank.';

	const handleSave = () => {
		if (browser) {
			const arr = $idStore.slice();
			arr.push(name);

			const dataString = JSON.stringify(Array.from(new Set(arr)));
			localStorage.setItem(itemField, dataString);
			$idStore = JSON.parse(localStorage.getItem(itemField));

			dispatch('customizeSave', {
				save: true,
				id: name,
				overwrite: true // TODO: handle this later
			});

			name = '';
		}
	};
</script>

<!-- Save current Setting -->
<div class="w-full lg:w--5/12 flex flex-col gap-2">
	<h3 class="text-lg font-semibold">Save Current Settings</h3>
	<div class="flex gap-2 items-center w-full lg:w-5/12 font-mono text-secondary-dark">
		<div class={`${$hasError.value ? 'opacity-40 pointer-events-none select-none' : ''}`}>
			<Button variant="primary" onclick={handleSave}>Save</Button>
		</div>
		<input
			type="text"
			bind:value={name}
			placeholder="name the setting"
			class="bg-primary border border-secondary-acc px-2 py-1 w-full"
		/>
	</div>
	<div>
		<p class="opacity-60 font-mono text-sm flex items-center gap-2">
			<TriangleAlert size={20} />
			Saving overwrites existing setting with the same name.
		</p>
	</div>
	<!-- Error Fields -->
	{#if $hasError.errors.includes(errMsg)}
		<div>
			<p class="text-red-600 font-mono">{errMsg}</p>
		</div>
	{/if}
</div>
