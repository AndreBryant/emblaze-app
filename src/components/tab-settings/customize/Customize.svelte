<script>
	import { browser } from '$app/environment';
	import {
		hasError,
		ids,
		piano,
		noteCanvas,
		colorScheme,
		video
	} from '$lib/stores/customize-stores.js';

	import LoadSave from './LoadSave.svelte';
	import SaveCurrent from './SaveCurrent.svelte';
	import PianoFields from './fields/PianoFields.svelte';
	import NoteCanvasFields from './fields/NoteCanvasFields.svelte';
	import ColorSchemeFields from './fields/ColorSchemeFields.svelte';
	import VideoFields from './fields/VideoFields.svelte';

	let idStore;
	let idField = ids.itemField;
	$: idStore = ids.store;

	let pianoStore;
	let pianoField = piano.itemField;
	$: pianoStore = piano.store;

	let noteCanvasStore;
	let noteCanvasField = noteCanvas.itemField;
	$: noteCanvasStore = noteCanvas.store;

	let colorSchemeStore;
	let colorSchemeField = colorScheme.itemField;
	$: colorSchemeStore = colorScheme.store;

	let videoStore;
	let videoField = video.itemField;
	$: videoStore = video.store;

	const debugLocal = () => {
		if (browser) {
			(() => localStorage.clear())();
			$idStore = [{ id: 'default', desc: null }];
		}
	};

	const handleLoadSetting = (e) => {
		const id = e.detail.id;
		pianoFieldsRef.handleLoadSetting(id);
		noteCanvasFieldsRef.handleLoadSetting(id);
		colorSchemeFieldsRef.handleLoadSetting(id);
		videoFieldsRef.handleLoadSetting(id);
	};

	const handleCustomizeSave = (e) => {
		if (e.detail.save && !$hasError.value) {
			const id = e.detail.id;
			pianoFieldsRef.handleSave(id);
			noteCanvasFieldsRef.handleSave(id);
			colorSchemeFieldsRef.handleSave(id);
			videoFieldsRef.handleSave(id);
			loadSaveRef.setSelected(id);
		}
	};

	let pianoFieldsRef;
	let noteCanvasFieldsRef;
	let colorSchemeFieldsRef;
	let videoFieldsRef;
	let loadSaveRef;
</script>

<!-- <pre>{JSON.stringify($idStore, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify($pianoStore, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify($colorSchemeStore, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify($videoStore, null, 2)}</pre> -->
<!-- <button
	type="button"
	class="border px-4 py-1 bg-yellow-400 text-primary border-primary"
	on:click={debugLocal}
>
	debug Reset LocalStorage
</button> -->

<div class="flex flex-col gap-8 pb-8 backdrop-blur-sm">
	<div class="flex flex-col gap-4">
		<LoadSave bind:this={loadSaveRef} on:loadSave={handleLoadSetting} />
		<hr class="opacity-40" />
	</div>
	<div class="flex flex-col gap-8">
		<SaveCurrent on:customizeSave={handleCustomizeSave} />
		<PianoFields bind:this={pianoFieldsRef} />
		<NoteCanvasFields bind:this={noteCanvasFieldsRef} />
		<ColorSchemeFields bind:this={colorSchemeFieldsRef} />
		<VideoFields bind:this={videoFieldsRef} />
	</div>
</div>
