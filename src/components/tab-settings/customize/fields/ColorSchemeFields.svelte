<script>
	import { browser } from '$app/environment';
	import { colorScheme } from '$lib/stores/customize-stores.js';

	let colorSchemeStore;
	let itemField;
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
			colorBy = data.colorBy;
			colorGeneration = data.colorGeneration;
		}
	};

	let colorBy = 'track';
	let colorGeneration = 'random';
	export { handleSave, handleLoadSetting };
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Color Scheme</h3>
	<table class="table-fixed w-full text-secondary-dark">
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
					class="bg-primary border border-secondary-acc px-2 py-1 w-full"
					bind:value={colorBy}
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
						class="bg-primary border border-secondary-acc px-2 py-1 w-full pointer-events-none"
						bind:value={colorGeneration}
					>
						<option value="random">random</option>
						<option value="image">from image</option>
					</select>
				</div>
			</td>
		</tr>
	</table>
</div>
