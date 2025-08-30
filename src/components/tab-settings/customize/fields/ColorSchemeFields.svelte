<script>
	import { browser } from '$app/environment';
	import { colorScheme } from '$lib/stores/customize-stores.js';
	import { sessionSettings } from '$lib/stores/session-store.js';

	let colorBy = $sessionSettings['customize']['colorScheme'].colorBy;
	let colorGeneration = $sessionSettings['customize']['colorScheme'].colorGeneration;

	$: {
		colorBy = $sessionSettings['customize']['colorScheme'].colorBy;
		colorGeneration = $sessionSettings['customize']['colorScheme'].colorGeneration;
	}

	let colorSchemeStore;
	let itemField = colorScheme.itemField;
	$: colorSchemeStore = colorScheme.store;

	const handleSave = (id) => {
		if (browser) {
			const colorSchemeData = {
				sID: id,
				colorScheme: {
					colorBy,
					colorGeneration
				}
			};

			let arr = $colorSchemeStore.slice();
			arr = arr.filter((colorScheme) => colorScheme.sID !== id);
			arr.push(colorSchemeData);

			const dataString = JSON.stringify(arr);
			localStorage.setItem(itemField, dataString);
			$colorSchemeStore = JSON.parse(localStorage.getItem(itemField));
		}
	};
	const handleLoadSetting = (id) => {
		if (browser) {
			const data = $colorSchemeStore.filter((colorScheme) => colorScheme.sID === id)[0][
				'colorScheme'
			];
			$sessionSettings['customize']['colorScheme'].colorBy = data.colorBy;
			$sessionSettings['customize']['colorScheme'].colorGeneration = data.colorGeneration;
		}
	};

	export { handleSave, handleLoadSetting };
</script>

<div class="flex w-full flex-col gap-4 lg:w-6/12">
	<h3 class="text-lg font-semibold">Color Scheme</h3>
	<table
		class="w-full table-fixed text-secondary-dark [&>tr]:grid [&>tr]:columns-2 md:[&>tr]:table-row"
	>
		<tr class="pointer-events-none select-none opacity-40">
			<td class="py-1">
				<div>
					<pre>Upload Pallete/Image: </pre>
				</div>
			</td>
			<td>
				<div>
					<input type="file" name="" id="" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Color By:</pre>
			</td>
			<td>
				<select
					class="w-full border border-secondary-acc bg-primary px-2 py-1"
					bind:value={$sessionSettings['customize']['colorScheme'].colorBy}
				>
					<option value="channel">channel</option>
					<option value="track">track</option>
				</select>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Color Generation:</pre>
			</td>
			<td>
				<div class="cursor-not-allowed">
					<select
						class="pointer-events-none w-full border border-secondary-acc bg-primary px-2 py-1"
						bind:value={$sessionSettings['customize']['colorScheme'].colorGeneration}
					>
						<option value="random">random</option>
						<option value="image">from image</option>
					</select>
				</div>
			</td>
		</tr>
	</table>
</div>
