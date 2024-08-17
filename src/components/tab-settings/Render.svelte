<script>
	import { onDestroy, onMount } from 'svelte';
	import { filename, paused } from '$lib/stores/midi-stores.js';
	import Button from '../Buttons/Button.svelte';

	import { Play, Pause, ChevronsRight, ChevronLeft, Boxes } from 'lucide-svelte';

	let p5Sketch;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const p5 = await import('p5');

			const { createSketch } = await import('$lib/midi-video');

			let parent = document.getElementById('sketch-holder');
			p5Sketch = createSketch(p5.default, parent);
		}
	});

	onDestroy(() => {
		if (p5Sketch && p5Sketch.remove) {
			p5Sketch.remove();
		}
	});
</script>

<div class="flex flex-col gap-1 h-full">
	<h2 class="text-xl">Render/Preview</h2>

	<div class="flex-grow flex flex-col gap-8">
		<div class="w-full h-full flex flex-col flex-grow justify-center items-center gap-2">
			<!-- P5 SKETCH CONTAINER  -->
			<div
				id="sketch-holder"
				class="w-full lg:w-3/5 aspect-video backdrop-blur-sm border border-black"
			></div>

			<!-- PLAY CONTROLS -->
			<div class="w-full flex flex-col justify-center items-center gap-2">
				<!-- Progess Bar -->
				<div class="w-full lg:w-3/5">
					<input type="range" class="w-full h-1 accent-acc-2-light pointer-events-none" value="0" />
				</div>

				<!-- Buttons -->
				<div class="w-full lg:w-3/5 flex justify-between">
					<!-- RENDER BUTTON -->
					<div class="flex gap-4">
						<button
							type="button"
							class="hover:bg-acc-1-light hover:border-transparent transition aspect-square p-2 rounded-lg border border-opacity-5 flex justify-center items-center"
							title="Render"
						>
							<Boxes />
						</button>
					</div>
					<!-- PLAY/PAUSE + SEEK BUTTONS -->
					<div class="justify-center flex gap-8">
						<Button variant="ghost"><ChevronLeft /></Button>
						{#if $paused}
							<Button variant="primary"><Play /></Button>
						{:else}
							<Button variant="primary"><Pause /></Button>
						{/if}
						<Button variant="ghost"><ChevronsRight /></Button>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	</div>

	<pre class="text-sm opacity-70">&gt; {$filename
			? 'filename: ' + $filename
			: 'No MIDI File Loaded'}</pre>
</div>
