<script>
	import Button from './Buttons/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { processFile } from '$lib/processMidi.js';

	let midi;
	let filename = '';
	let hasMidiFileLoaded = false;
	let dispatch = createEventDispatcher();

	const handleFileChange = async (e) => {
		const midiFile = e.target.files[0];
		if (midiFile) {
			try {
				midi = await processFile(midiFile);
				filename = midiFile.name;
				hasMidiFileLoaded = true;
				dispatch('midiFileLoad', {
					midiData: midi
				});
			} catch (error) {
				console.error('Error processing MIDI file:', error);
				hasMidiFileLoaded = false;
			}
		}
	};

	const triggerFileInput = () => {
		document.getElementById('midi-file').click();
	};

	const unloadFile = () => {
		midi = null;
		filename = '';
		hasMidiFileLoaded = false;
		document.getElementById('midi-file').value = null;
		dispatch('midiFileUnloaded', {
			midiData: null
		});
	};
</script>

<input
	type="file"
	name="midi-file"
	id="midi-file"
	accept=".mid"
	on:change={handleFileChange}
	class="hidden"
/>
{#if hasMidiFileLoaded}
	<Button
		type="button"
		variant="destructive"
		value="Unload File"
		wFull={true}
		onclick={unloadFile}
	/>
{/if}

<Button
	type="button"
	variant="primary"
	value={`${filename ? filename : 'Select File'}`}
	wFull={true}
	onclick={triggerFileInput}
/>
