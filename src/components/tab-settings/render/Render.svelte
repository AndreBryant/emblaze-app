<script>
	import { onMount } from 'svelte';
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

		return () => {
			conductor = null;
		};
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

<div class="flex h-full flex-col gap-2">
	<div class="flex flex-grow flex-col gap-8">
		<div class="flex h-full w-full flex-grow flex-col items-center justify-center gap-2">
			<!-- P5 SKETCH CONTAINER  -->
			<div
				id="sketch-holder"
				class="aspect-video w-full border border-black backdrop-blur-sm lg:w-8/12"
			>
				<canvas id="pixi-canvas" class="block h-full w-full max-w-full"></canvas>
			</div>

			<!-- PLAY CONTROLS -->
			<div class="flex w-full flex-col items-center justify-center gap-4">
				<!-- Progess Bar -->
				<div class="w-full lg:w-8/12">
					<input
						type="range"
						class="custom-slider pointer-events-none h-1 w-full accent-acc-2-light"
						min="0"
						max="100"
						step="0.10"
						bind:value={progress}
					/>
				</div>

				<!-- Buttons -->
				<div class="flex w-full justify-between lg:w-8/12">
					<!-- RENDER BUTTON -->
					<div class="flex">
						<button
							type="button"
							class="flex items-center justify-center gap-2 rounded-lg border border-secondary-acc/40 bg-secondary-acc/40 pl-2 pr-3 transition hover:bg-secondary-acc"
							title="Render"
						>
							<Boxes /> <span class="font-mono text-sm font-semibold">Render</span>
						</button>
					</div>
					<!-- PLAY/PAUSE + SEEK BUTTONS -->
					<div class="flex justify-center gap-8">
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
			? 'Now playing: ' + $filename
			: 'No MIDI File Loaded'}</pre>
</div>
