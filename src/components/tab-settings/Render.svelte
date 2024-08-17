<script>
	import { onMount } from 'svelte';

	let p5Sketch;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			//import p5 here so we know we are already in the browser
			const p5 = await import('p5');

			const { createSketch } = await import('$lib/midi-video');

			let parent = document.getElementById('sketch-holder');
			p5Sketch = createSketch(p5.default, parent);
		}
	});
</script>

<div class="flex flex-col gap-8 h-full">
	<h2 class="text-xl">Render/Preview</h2>
	<div class="flex-grow flex flex-col gap-8">
		<div class="w-full flex justify-center">
			<div id="sketch-holder" class="w-9/12 aspect-video border border-acc-2"></div>
		</div>
		<div>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
		</div>
	</div>
</div>
