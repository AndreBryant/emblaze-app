<script>
	import Button from '../Buttons/Button.svelte';
	import { FileX2, FileCheck2, File } from 'lucide-svelte';
	import { processFile } from '$lib/processMidi.js';
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { midiData, filename, midiLoaded } from '$lib/stores/midi-stores.js';

	const iconSize = 22;

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

<div class="space-y-4">
	<hr class="border-secondary/10" />

	<!-- For the unload midi file button -->
	{#if $midiLoaded}
		{#if $isSidebarCollapsed}
			<Button variant="destructive" onclick={unloadFile} icon={FileX2} />
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

	<!-- For the load midi file button -->
	{#if $isSidebarCollapsed}
		{#if $midiLoaded}
			<Button
				variant="primary"
				onclick={triggerFileInput}
				wFull={true}
				icon={FileCheck2}
				classes="p-4"
			/>
		{:else}
			<Button variant="primary" onclick={triggerFileInput} wFull={true} icon={File} classes="p-4" />
		{/if}
	{:else}
		<Button
			type="button"
			variant="primary"
			wFull={true}
			onclick={triggerFileInput}
			value={`${$filename ? $filename : 'Select File'}`}
		/>
	{/if}
</div>
