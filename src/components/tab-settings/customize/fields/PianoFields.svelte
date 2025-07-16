<script>
	import { browser } from '$app/environment';
	import { piano, hasError } from '$lib/stores/customize-stores.js';

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

	let pianoRimColor = '#C27803';
	let pianoBlazeColor = '#C27803';
	let numOfKeys = '88';
	let startKey = '21';
	let lastKey = '108';
	let pianoStore;
	let itemField = piano.itemField;

	$: pianoStore = piano.store;

	// TODO: Or you can trun this into an object and get error type. ex: type 1, type 2
	const errMsg =
		'Error: (Piano Settings) The number of keys must be between at least 2 and at most 128.';
	$: {
		if (numOfKeys === 'custom') {
			const keys = Number(lastKey) - Number(startKey) + 1;
			if (keys <= 1 || keys > 128) {
				$hasError.value = true;
				if (!$hasError.errors.includes(errMsg)) {
					$hasError.errors.push(errMsg);
				}
			} else {
				$hasError.value = false;
				$hasError.errors = $hasError.errors.filter((error) => error !== errMsg);
			}
		} else {
			switch (numOfKeys) {
				case '61':
					$hasError.value = false;
					$hasError.errors = $hasError.errors.filter((error) => error !== errMsg);
					startKey = '36';
					lastKey = '96';
					break;
				case '88':
					$hasError.value = false;
					$hasError.errors = $hasError.errors.filter((error) => error !== errMsg);
					startKey = '21';
					lastKey = '108';
					break;
				case '128':
					$hasError.value = false;
					$hasError.errors = $hasError.errors.filter((error) => error !== errMsg);
					startKey = '0';
					lastKey = '127';
					break;
			}
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
	{#if $hasError.errors.includes(errMsg)}
		<div>
			<p class="text-red-600">{errMsg}</p>
		</div>
	{/if}
</div>
