<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import * as stores from '$lib/stores/customize-stores.js';
	let pianoSettings;
	let videoSettings;
	let colorSettings;
	let noteCanvasSettings;
	onMount(() => {
		if (browser) {
			// for (let key in stores) {
			// 	console.log(key);
			// }
			console.log(stores.piano.store);
		}
	});
</script>

<div class="flex flex-col gap-8"></div>
