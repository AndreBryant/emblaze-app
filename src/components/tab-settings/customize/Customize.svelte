<script>
	import LoadSave from './LoadSave.svelte';
	import SaveCurrent from './SaveCurrent.svelte';
	import PianoFields from './fields/PianoFields.svelte';
	import NoteCanvasFields from './fields/NoteCanvasFields.svelte';
	import ColorSchemeFields from './fields/ColorSchemeFields.svelte';
	import VideoFields from './fields/VideoFields.svelte';
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
		<NoteCanvasFields />
		<ColorSchemeFields />
		<VideoFields />
	</div>
</div>
