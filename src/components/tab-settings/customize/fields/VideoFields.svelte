<script>
	import { browser } from '$app/environment';
	import { video } from '$lib/stores/customize-stores.js';
	import { sessionSettings } from '$lib/stores/session-store.js';

	// let quality = $sessionSettings['customize']['videoFields'].quality;
	// let fps = $sessionSettings['customize']['videoFields'].fps;

	// $: {
	// 	quality = $sessionSettings['customize']['videoFields'].quality;
	// 	fps = $sessionSettings['customize']['videoFields'].fps;
	// }

	let videoStore;
	let itemField = video.itemField;
	$: videoStore = video.store;

	const handleSave = (id) => {
		if (browser) {
			const videoData = {
				sID: id,
				video: {
					quality: $sessionSettings['customize']['videoFields'].quality,
					fps: $sessionSettings['customize']['videoFields'].fps
				}
			};

			let arr = $videoStore.slice();
			arr = arr.filter((v) => v.sID !== id);
			arr.push(videoData);

			const dataString = JSON.stringify(arr);
			localStorage.setItem(itemField, dataString);
			$videoStore = JSON.parse(localStorage.getItem(itemField));
		}
	};

	const handleLoadSetting = (id) => {
		if (browser) {
			const data = $videoStore.filter((video) => video.sID === id)[0]['video'];
			$sessionSettings['customize']['videoFields'].quality = data.quality;
			$sessionSettings['customize']['videoFields'].fps = data.fps;
		}
	};

	$: {
		let val = Number($sessionSettings['customize']['videoFields'].fps);

		if (val < 0) $sessionSettings['customize']['videoFields'].fps = '1';
		if (val > 60) $sessionSettings['customize']['videoFields'].fps = '60';
		if (val === NaN) $sessionSettings['customize']['videoFields'].fps = '30';
	}
	export { handleSave, handleLoadSetting };
</script>

<div class="flex w-full flex-col gap-4 lg:w-6/12">
	<h3 class="text-lg font-semibold">Video Settings</h3>
	<table
		class="w-full table-fixed text-secondary-dark [&>tr]:grid [&>tr]:columns-2 md:[&>tr]:table-row"
	>
		<tr>
			<td class="py-1">
				<div>
					<pre>Quality: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select
						bind:value={$sessionSettings['customize']['videoFields'].quality}
						class="w-full border border-secondary-acc bg-primary px-2 py-1"
					>
						<option value="360p">360p</option>
						<option value="720p">720p</option>
						<option value="1080p">1080p</option>
						<option value="4k">4k</option>
						<option value="8k">8k</option>
					</select>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Frame Rate: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="number"
						class=" w-full border border-secondary-acc bg-primary px-3"
						bind:value={$sessionSettings['customize']['videoFields'].fps}
						min="0"
						max="60"
					/>
				</div>
			</td>
		</tr>
	</table>
</div>
