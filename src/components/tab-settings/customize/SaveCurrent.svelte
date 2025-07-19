<script>
	import { browser } from '$app/environment';
	import { hasError, ids, loadedSetting } from '$lib/stores/customize-stores.js';
	import { createEventDispatcher } from 'svelte';
	import { TriangleAlert } from 'lucide-svelte';
	import Button from '../../Buttons/Button.svelte';
	import ErrorFields from './fields/ErrorFields.svelte';

	const field = 'save-current';

	let idStore;
	let itemField = ids.itemField;

	$: idStore = ids.store;

	const dispatch = createEventDispatcher();

	let name = '';
	let description = '';

	const handleSave = () => {
		if (!name.length) {
			const errMsg = 'Error: Name for a setting cannot be blank.';
			$hasError[field].value = true;
			$hasError[field].errors = [];
			$hasError[field].errors.push(errMsg);
			return;
		} else if (checkForErrors($hasError)) {
			const errMsg = 'Error: Unable to save as there are error in other fields.';
			$hasError[field].value = true;
			$hasError[field].errors = [];
			$hasError[field].errors.push(errMsg);
			return;
		}

		if (browser) {
			const arr = $idStore.slice();
			arr.push({ id: name, desc: description });

			const dataString = JSON.stringify(Array.from(new Set(arr)));
			localStorage.setItem(itemField, dataString);
			$idStore = JSON.parse(localStorage.getItem(itemField));

			dispatch('customizeSave', {
				save: true,
				id: name,
				overwrite: true // TODO: handle this later
			});

			$hasError[field].value = false;
			$hasError[field].errors = [];

			loadedSetting.store.set(name);

			name = '';
			description = '';
		}
	};

	function checkForErrors(data) {
		for (let key in data) {
			if (data[key].value && key !== field) return true;
		}
		return false;
	}
</script>

<!-- Save current Setting -->
<div class="w-full lg:w--5/12 flex flex-col gap-2">
	<h3 class="text-lg font-semibold">Save Current Settings</h3>
	<div class="flex gap-2 items-center w-full lg:w-5/12 text-secondary-dark">
		<div class={`${$hasError.value ? 'opacity-40 pointer-events-none select-none' : ''}`}>
			<Button variant="primary" onclick={handleSave}>Save</Button>
		</div>
		<input
			type="text"
			bind:value={name}
			placeholder="Name the setting"
			class="bg-primary border border-secondary-acc px-2 py-1 w-full"
		/>
	</div>
	<div class="w-full lg:w-5/12">
		<input
			type="text"
			bind:value={description}
			placeholder="Add a short description"
			class="bg-primary border border-secondary-acc px-2 py-1 w-full"
		/>
	</div>
	<div>
		<p class="opacity-60 text-sm flex items-center gap-2">
			<TriangleAlert size={20} />
			For now, configurations can be set with same names. I haven't implemented the overwriting yet T_,T
		</p>
	</div>
	<ErrorFields field="save-current" />
</div>
