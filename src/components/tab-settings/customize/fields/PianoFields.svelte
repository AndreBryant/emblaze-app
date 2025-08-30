<script>
	import { browser } from '$app/environment';
	import { piano, hasError } from '$lib/stores/customize-stores.js';
	import { sessionSettings } from '$lib/stores/session-store.js';

	import ErrorFields from './ErrorFields.svelte';

	// These variables are global now with the use of sessionSettings Store

	// let pianoRimColor = $sessionSettings['customize']['pianoFields'].pianoRimColor;
	// let pianoBlazeColor = $sessionSettings['customize']['pianoFields'].pianoBlazeColor;
	// let numOfKeys = $sessionSettings['customize']['pianoFields'].numOfKeys;
	// let startKey = $sessionSettings['customize']['pianoFields'].startKey;
	// let lastKey = $sessionSettings['customize']['pianoFields'].lastKey;

	// $: {
	// 	pianoRimColor = $sessionSettings['customize']['pianoFields'].pianoRimColor;
	// 	pianoBlazeColor = $sessionSettings['customize']['pianoFields'].pianoBlazeColor;
	// 	numOfKeys = $sessionSettings['customize']['pianoFields'].numOfKeys;
	// 	startKey = $sessionSettings['customize']['pianoFields'].startKey;
	// 	lastKey = $sessionSettings['customize']['pianoFields'].lastKey;
	// }

	let pianoStore = piano.store;
	let itemField = piano.itemField;
	$: pianoStore = piano.store;

	const handleSave = (id) => {
		if (browser) {
			startKey = startKey || '0';
			lastKey = lastKey || '127';

			const pianoData = {
				sID: id,
				piano: {
					pianoRimColor,
					pianoBlazeColor,
					numOfKeys,
					startKey,
					lastKey
				}
			};

			let arr = $pianoStore.slice();
			arr = arr.filter((p) => p.sID !== id);
			arr.push(pianoData);

			const dataString = JSON.stringify(arr);
			localStorage.setItem(itemField, dataString);
			$pianoStore = JSON.parse(localStorage.getItem(itemField));
		}
	};

	const handleLoadSetting = (id) => {
		if (browser) {
			const data = $pianoStore.filter((piano) => piano.sID === id)[0]['piano'];
			$sessionSettings['customize']['pianoFields'].pianoRimColor = data.pianoRimColor;
			$sessionSettings['customize']['pianoFields'].pianoBlazeColor = data.pianoBlazeColor;
			$sessionSettings['customize']['pianoFields'].numOfKeys = data.numOfKeys;
			$sessionSettings['customize']['pianoFields'].startKey = data.startKey;
			$sessionSettings['customize']['pianoFields'].lastKey = data.lastKey;
		}
	};

	$: {
		const field = 'piano-fields';
		if ($sessionSettings['customize']['pianoFields'].numOfKeys === '-1') {
			const start = Number($sessionSettings['customize']['pianoFields'].startKey | 0);
			const last = Number($sessionSettings['customize']['pianoFields'].lastKey | 0);

			let errorMsg;
			if (start < 0 || last < 0) {
				errorMsg = `Start key or last key indices cannot be negative value. (startkey: ${start}, lastKey: ${last})`;
				$hasError[field].value = true;
				$hasError[field].errors = [];
				$hasError[field].errors.push(errorMsg);
			} else if (start > last) {
				errorMsg = `Start key cannot be larger than the last key index. (startkey: ${start}, lastKey: ${last})`;
				$hasError[field].value = true;
				$hasError[field].errors = [];
				$hasError[field].errors.push(errorMsg);
			} else {
				$hasError[field].value = false;
				$hasError[field].errors = [];

				$sessionSettings['customize']['pianoFields'].startKey = start + '';
				$sessionSettings['customize']['pianoFields'].lastKey = last + '';
			}
		} else {
			switch ($sessionSettings['customize']['pianoFields'].numOfKeys) {
				case '61':
					$sessionSettings['customize']['pianoFields'].startKey = '36';
					$sessionSettings['customize']['pianoFields'].lastKey = '96';
					break;
				case '88':
					$sessionSettings['customize']['pianoFields'].startKey = '21';
					$sessionSettings['customize']['pianoFields'].lastKey = '108';
					break;
				case '128':
					$sessionSettings['customize']['pianoFields'].startKey = '0';
					$sessionSettings['customize']['pianoFields'].lastKey = '127';
					break;
			}

			$hasError[field].value = false;
			$hasError[field].errors = [];
		}
	}

	export { handleSave, handleLoadSetting };
</script>

<div class="flex w-full flex-col gap-4 lg:w-6/12">
	<h3 class="text-lg font-semibold">Piano Settings</h3>

	<table class="w-full table-fixed text-secondary-dark [&>tr]:grid md:[&>tr]:table-row">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Piano Rim Color: </pre>
					<input
						type="color"
						class="h-8 w-8 rounded-md border border-secondary-acc bg-transparent"
						bind:value={$sessionSettings.customize.pianoFields.pianoRimColor}
					/>
				</div>
			</td>
			<td>
				<div class="col-span-6 flex gap-4">
					<div class="flex items-center">
						<pre>Piano Aura Color: </pre>
						<input
							type="color"
							class="h-8 w-8 rounded-md border border-secondary-acc bg-transparent"
							bind:value={$sessionSettings.customize.pianoFields.pianoBlazeColor}
						/>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Number of Keys: </pre>
			</td>
			<td>
				<select
					name=""
					id=""
					class="w-full border border-secondary-acc bg-primary px-2 py-1"
					bind:value={$sessionSettings.customize.pianoFields.numOfKeys}
				>
					<option value="61">61</option>
					<option value="88">88</option>
					<option value="128">128</option>
					<option value="-1"
						>Custom
						{#if $sessionSettings['customize']['pianoFields'].numOfKeys === '-1'}
							({Number($sessionSettings['customize']['pianoFields'].lastKey) -
								Number($sessionSettings['customize']['pianoFields'].startKey) +
								1} keys)
						{/if}
					</option>
				</select>
			</td>
		</tr>
		<tr
			class={`${$sessionSettings['customize']['pianoFields'].numOfKeys !== '-1' ? 'pointer-events-none select-none opacity-45' : ''}`}
		>
			<td class="py-1">
				<pre>Start Key: </pre>
			</td>
			<td>
				<input
					type="number"
					bind:value={$sessionSettings.customize.pianoFields.startKey}
					min={0}
					max={$sessionSettings['customize']['pianoFields'].lastKey}
					class="w-full border border-secondary-acc bg-primary px-3 py-1"
				/>
			</td>
		</tr>
		<tr
			class={`${$sessionSettings['customize']['pianoFields'].numOfKeys !== '-1' ? 'pointer-events-none select-none opacity-45' : ''}`}
		>
			<td class="py-1">
				<pre>Last Key: </pre>
			</td>
			<td>
				<input
					type="number"
					bind:value={$sessionSettings.customize.pianoFields.lastKey}
					min={$sessionSettings['customize']['pianoFields'].startKey}
					max={127}
					class="w-full border border-secondary-acc bg-primary px-3 py-1"
				/>
			</td>
		</tr>
	</table>

	<!-- Error Fields -->
	<ErrorFields field="piano-fields" />
</div>
