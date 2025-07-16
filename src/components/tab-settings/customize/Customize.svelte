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
	import { onMount } from 'svelte';

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

	const fetchDataFromLocalStorage = () => {
		if (browser) {
			// id
			let data = localStorage.getItem(idField) || '[]';
			let dataStr = JSON.parse(data).filter((id) => id !== 'default');
			$idStore = Array.from(new Set($idStore.concat(dataStr)));

			// piano
			data = localStorage.getItem(pianoField) || '[]';
			dataStr = JSON.parse(data).filter((piano) => piano.sID !== 'default');
			$pianoStore = Array.from(new Set($pianoStore.concat(dataStr)));

			// note canvas
			data = localStorage.getItem(noteCanvasField) || '[]';
			dataStr = JSON.parse(data).filter((noteCanvas) => noteCanvas.sID !== 'default');
			$noteCanvasStore = Array.from(new Set($noteCanvasStore.concat(dataStr)));

			// color scheme
			data = localStorage.getItem(colorSchemeField) || '[]';
			dataStr = JSON.parse(data).filter((colorScheme) => colorScheme.sID !== 'default');
			$colorSchemeStore = Array.from(new Set($colorSchemeStore.concat(dataStr)));

			// video
			data = localStorage.getItem(videoField) || '[]';
			dataStr = JSON.parse(data).filter((video) => video.sID !== 'default');
			$videoStore = Array.from(new Set($videoStore.concat(dataStr)));
		}
	};

	const debugLocal = () => {
		if (browser) {
			(() => localStorage.clear())();
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

	onMount(() => {
		fetchDataFromLocalStorage();
	});
</script>

<!-- <pre>{JSON.stringify($idStore, null, 2)}</pre>
<pre>{JSON.stringify($pianoStore, null, 2)}</pre>
<pre>{JSON.stringify($colorSchemeStore, null, 2)}</pre>
<pre>{JSON.stringify($videoStore, null, 2)}</pre> -->
<!-- <button
	type="button"
	class="border px-4 py-1 bg-yellow-400 text-primary border-primary"
	on:click={debugLocal}
>
	debug Reset LocalStorage
</button> -->

<div class="flex flex-col gap-8 pb-8 backdrop-blur-sm">
	<h2 class="text-xl">Customize</h2>

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
