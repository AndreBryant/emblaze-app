<script>
	import { onDestroy, onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { Play, Pause, ChevronsRight, ChevronLeft, Boxes } from 'lucide-svelte';

	import { midiData, filename, paused } from '$lib/stores/midi-stores.js';
	import { currentTick, lastTick } from '$lib/midi-video/classes/conductor.js';
	import Button from '../../Buttons/Button.svelte';

	let conductor = null;
	let progress = 0;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const PIXI = await import('pixi.js');
			const { createPixiSketch } = await import('$lib/midi-video');

			let canvas = document.getElementById('pixi-canvas');
			conductor = await createPixiSketch(PIXI, canvas);
		}
	});

	onDestroy(() => {
		if (conductor) {
			console.log('OnDestroy: remove conductor pixi sketch here');
		}
	});

	const togglePlay = () => ($paused = !$paused);

	const updateProgress = () => {
		if (conductor && conductor.lastTick) {
			progress = conductor.currentTick / conductor.lastTick;
		}
		animationFrame = requestAnimationFrame(updateProgress);
	};

	$: progress = ($currentTick / $lastTick) * 100;
</script>

<div class="flex flex-col gap-1 h-full">
	<div class="flex-grow flex flex-col gap-8">
		<div class="w-full h-full flex flex-col flex-grow justify-center items-center gap-2">
			<!-- P5 SKETCH CONTAINER  -->
			<div
				id="sketch-holder"
				class="w-full lg:w-3/5 aspect-video backdrop-blur-sm border border-black"
			>
				<canvas id="pixi-canvas" class="h-full w-full block max-w-full"></canvas>
			</div>

			<!-- PLAY CONTROLS -->
			<div class="w-full flex flex-col justify-center items-center gap-2">
				<!-- Progess Bar -->
				<div class="w-full lg:w-3/5">
					<input
						type="range"
						class="custom-slider w-full h-1 pointer-events-none accent-acc-2-light"
						min="0"
						max="100"
						step="0.10"
						bind:value={progress}
					/>
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
						<Button variant="ghost" onclick={async () => await conductor.seekLeft()}
							><ChevronLeft /></Button
						>
						<Button variant="primary" onclick={togglePlay}>
							{#if $paused}
								<Play />
							{:else}
								<Pause />
							{/if}
						</Button>
						<Button variant="ghost" onclick={async () => await conductor.seekRight()}
							><ChevronsRight /></Button
						>
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
