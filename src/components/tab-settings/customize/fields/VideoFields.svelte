<script>
	import { browser } from '$app/environment';
	import { video } from '$lib/stores/customize-stores.js';

	let videoStore;
	let itemField = video.itemField;
	$: videoStore = video.store;

	const handleSave = (id) => {
		if (browser) {
			const videoData = {
				sID: id,
				video: {
					quality,
					fps
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
			quality = data.quality;
			fps = data.fps;
		}
	};

	let quality = '360p';
	let fps = '30';

	$: {
		let val = Number(fps);
		if (val < 0) fps = '0';
		if (val > 60) fps = '60';
	}
	export { handleSave, handleLoadSetting };
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Video Settings</h3>
	<table class="table-fixed w-full text-secondary-dark">
		<tr>
			<td class="py-1">
				<div>
					<pre>Quality: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select
						bind:value={quality}
						class="bg-primary border border-secondary-acc px-2 py-1 w-full"
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
						class=" bg-primary border border-secondary-acc w-full px-3"
						bind:value={fps}
						min="0"
						max="60"
					/>
				</div>
			</td>
		</tr>
	</table>
</div>
