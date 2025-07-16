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
			console.log(stores.piano.itemField);
		}
	});
</script>

<div class="flex flex-col gap-8">
	<div>test</div>
</div>
