<script>
	import Button from './Buttons/Button.svelte';
	import { FileX2, FileCheck2 } from 'lucide-svelte';
	import { processFile } from '$lib/processMidi.js';
	import { isSideBarCollapsed } from '$lib/stores/app-stores.js';
	import { midiData, filename, midiLoaded } from '$lib/stores/midi-stores.js';

	const handleFileChange = async (e) => {
		const midiFile = e.target.files[0];
		if (midiFile) {
			try {
				$midiData = await processFile(midiFile);
				$filename = midiFile.name;
				$midiLoaded = true;
			} catch (error) {
				console.error('Error processing MIDI file:', error);
				$midiLoaded = false;
			}
		}
	};

	const triggerFileInput = () => {
		document.getElementById('midi-file').click();
	};

	const unloadFile = () => {
		$filename = '';
		$midiData = null;
		$midiLoaded = false;
		document.getElementById('midi-file').value = null;
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
{#if $midiLoaded}
	{#if $isSideBarCollapsed}
		<Button variant="destructive" onclick={unloadFile}>
			<FileX2 />
		</Button>
	{:else}
		<Button
			type="button"
			variant="destructive"
			value="Unload File"
			wFull={true}
			onclick={unloadFile}
		/>
	{/if}
{/if}

{#if $isSideBarCollapsed}
	<Button variant="primary" onclick={triggerFileInput}>
		<FileCheck2 />
	</Button>
{:else}
	<Button
		type="button"
		variant="primary"
		wFull={true}
		onclick={triggerFileInput}
		value={`${$filename ? $filename : 'Select File'}`}
	/>
{/if}
