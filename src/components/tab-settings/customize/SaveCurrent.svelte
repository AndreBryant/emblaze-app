<script>
	import { addToast } from '$lib/stores/toastStore.js';
	import { hasError, ids, loadedSetting } from '$lib/stores/customize-stores.js';
	import { createEventDispatcher } from 'svelte';
	import { TriangleAlert } from 'lucide-svelte';
	import { browser } from '$app/environment';

	import Button from '../../Buttons/Button.svelte';
	import ErrorFields from './fields/ErrorFields.svelte';

	const dispatch = createEventDispatcher();
	const field = 'save-current';

	let name = '';
	let description = '';

	let itemField = ids.itemField;
	let idStore = ids.store;

	const handleSave = () => {
		if (!name.trim().length) {
			const errMsg = 'Error: Name for a setting cannot be blank.';
			$hasError[field].value = true;
			$hasError[field].errors = [];
			$hasError[field].errors.push(errMsg);
			addToast(errMsg, 'fail');
			return;
		} else if (checkForErrors($hasError)) {
			const errMsg = 'Error: Unable to save as there are error in other fields.';
			$hasError[field].value = true;
			$hasError[field].errors = [];
			$hasError[field].errors.push(errMsg);
			addToast(errMsg, 'fail');
			return;
		}

		if (browser) {
			const arr = $idStore.slice();
			arr.push({ id: name, desc: description });

			const dataString = JSON.stringify(Array.from(new Set(arr)));
			localStorage.setItem(itemField, dataString);
			$idStore = JSON.parse(localStorage.getItem(itemField));

			$hasError[field].value = false;
			$hasError[field].errors = [];

			loadedSetting.store.set(name);

			dispatch('customizeSave', {
				save: true,
				id: name,
				overwrite: true // TODO: handle this later
			});
			addToast(`${name} setting saved successfully`, 'success');

			name = '';
			description = '';
		}
	};

	const checkForErrors = (data) => {
		for (let key in data) {
			if (data[key].value && key !== field) return true;
		}
		return false;
	};

	$: idStore = ids.store;
</script>

<!-- Save current Setting -->
<div class="lg:w--5/12 flex w-full flex-col gap-2">
	<h3 class="text-lg font-semibold">Save Current Settings</h3>
	<div class="flex w-full items-center gap-2 text-secondary-dark lg:w-5/12">
		<div class={`${checkForErrors($hasError) ? 'pointer-events-none select-none opacity-40' : ''}`}>
			<Button variant="primary" onclick={handleSave}>Save</Button>
		</div>
		<input
			type="text"
			bind:value={name}
			placeholder="Name the setting"
			class="w-full border border-secondary-acc bg-primary px-2 py-1"
		/>
	</div>
	<div class="w-full lg:w-5/12">
		<input
			type="text"
			bind:value={description}
			placeholder="Add a short description"
			class="w-full border border-secondary-acc bg-primary px-2 py-1"
		/>
	</div>
	<div>
		<p class="flex items-center gap-2 text-sm opacity-60">
			<TriangleAlert size={20} />
			For now, configurations can be set with same names. I haven't implemented the overwriting yet T_,T
		</p>
	</div>
	<ErrorFields field="save-current" />
</div>
