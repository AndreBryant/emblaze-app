<script>
	import LoadSave from './LoadSave.svelte';
	import SaveCurrent from './SaveCurrent.svelte';
	import PianoFields from './fields/PianoFields.svelte';
	// <!-- Note Canvas -->
	// <div>
	// 	<h3>Note Canvas Customizations</h3>
	// 	<p>notespeed</p>
	// 	<p>key flare</p>
	// 	<p>particles</p>
	// </div>

	// <!-- if particles:on -->
	// <div>
	// 	<h3>Particles</h3>
	// 	<p>turbulence</p>
	// 	<p>numOfParticles per note</p>
	// 	<p>shoot velocity</p>
	// </div>

	// <!-- if flare:on -->
	// <div>
	// 	<h3>Key Flare</h3>
	// 	<p>intensity</p>
	// 	<p>type: fire, spark, or bubbles(? haha)</p>
	// </div>

	// <!-- Color Scheme -->
	// <div>
	// 	<h3>Upload Pallete/Image here</h3>
	// </div>

	// <!-- Video Customizations -->
	// <div>
	// 	<h3>Video Customizations</h3>
	// 	<p>dimensions: 360p 720p 1080p 4k 8k</p>
	// 	<p>Note Size: tick based|time based</p>
	// 	<p>framerate: 60 | 30 | custom:max[60]</p>
	// </div>
</script>

<!-- <script>
	import * as C from '$lib/stores/customize-stores.js';
</script> -->

<div class="flex flex-col gap-8 pb-8 backdrop-blur-sm">
	<h2 class="text-xl">Customize</h2>

	<div class="flex flex-col gap-4">
		<LoadSave />
		<hr class="opacity-40" />
	</div>
	<div class="flex flex-col gap-8">
		<SaveCurrent />
		<PianoFields />
	</div>
</div>
