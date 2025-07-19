<script>
	import { piano, hasError } from '$lib/stores/customize-stores.js';
	import { browser } from '$app/environment';

	import ErrorFields from './ErrorFields.svelte';

	let pianoRimColor = '#C27803';
	let pianoBlazeColor = '#C27803';
	let numOfKeys = '88';
	let startKey = '21';
	let lastKey = '108';
	let pianoStore = piano.store;
	let itemField = piano.itemField;

	const handleSave = (id) => {
		if (browser) {
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
			pianoRimColor = data.pianoRimColor;
			pianoBlazeColor = data.pianoBlazeColor;
			numOfKeys = data.numOfKeys;
			startKey = data.startKey;
			lastKey = data.lastKey;
		}
	};

	$: pianoStore = piano.store;

	$: {
		const field = 'piano-fields';
		if (numOfKeys === 'custom') {
			const start = Number(startKey);
			const last = Number(lastKey);

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
			}
		} else {
			switch (numOfKeys) {
				case '61':
					startKey = '36';
					lastKey = '96';
					break;
				case '88':
					startKey = '21';
					lastKey = '108';
					break;
				case '128':
					startKey = '0';
					lastKey = '127';
					break;
			}

			$hasError[field].value = false;
			$hasError[field].errors = [];
		}
	}

	export { handleSave, handleLoadSetting };
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Piano Settings</h3>

	<div></div>
	<table class="table-fixed w-full text-secondary-dark">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Piano Rim Color: </pre>
					<input
						type="color"
						class="w-8 h-8 bg-transparent border-secondary-acc border rounded-md"
						bind:value={pianoRimColor}
					/>
				</div>
			</td>
			<td>
				<div class="flex gap-4 col-span-6">
					<div class="flex items-center">
						<pre>Piano Blaze Color: </pre>
						<input
							type="color"
							class="w-8 h-8 bg-transparent border-secondary-acc border rounded-md"
							bind:value={pianoBlazeColor}
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
					class="bg-primary border border-secondary-acc px-2 py-1 w-full"
					bind:value={numOfKeys}
				>
					<option value="61">61</option>
					<option value="88">88</option>
					<option value="128">128</option>
					<option value="custom"
						>Custom
						{#if numOfKeys === 'custom'}
							({Number(lastKey) - Number(startKey) + 1} keys)
						{/if}
					</option>
				</select>
			</td>
		</tr>
		<tr class={`${numOfKeys !== 'custom' ? 'opacity-45 pointer-events-none select-none' : ''}`}>
			<td class="py-1">
				<pre>Start Key: </pre>
			</td>
			<td>
				<input
					type="number"
					bind:value={startKey}
					min={0}
					max={lastKey}
					class="bg-primary border border-secondary-acc px-3 py-1 w-full"
				/>
			</td>
		</tr>
		<tr class={`${numOfKeys !== 'custom' ? 'opacity-45 pointer-events-none select-none' : ''}`}>
			<td class="py-1">
				<pre>Last Key: </pre>
			</td>
			<td>
				<input
					type="number"
					bind:value={lastKey}
					min={startKey}
					max={127}
					class="bg-primary border border-secondary-acc px-3 py-1 w-full"
				/>
			</td>
		</tr>
	</table>

	<!-- Error Fields -->
	<ErrorFields field="piano-fields" />
</div>
