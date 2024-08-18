<script>
	import Button from './Buttons/Button.svelte';
	import { FileX2, FileCheck2, File } from 'lucide-svelte';
	import { processFile } from '$lib/processMidi.js';
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
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
	{#if $isSidebarCollapsed}
		<Button variant="destructive" onclick={unloadFile}>
			<FileX2 size={22} />
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

{#if $isSidebarCollapsed}
	<Button variant="primary" onclick={triggerFileInput}>
		{#if $midiLoaded}
			<FileCheck2 size={22} />
		{:else}
			<File size={22} />
		{/if}
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
