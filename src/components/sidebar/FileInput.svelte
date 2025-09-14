<script>
	import { addToast } from '$lib/stores/toastStore.js';
	import Button from '../Buttons/Button.svelte';
	import { FileX2, FileCheck2, File, LoaderCircle } from 'lucide-svelte';
	import { isSidebarCollapsed } from '$lib/stores/app-stores.js';
	import { midiData, filename, midiLoaded } from '$lib/stores/midi-stores.js';

	let isLoading = false;
	let worker;

	const handleFileChange = async (e) => {
		const midiFile = e.target.files[0];
		if (midiFile) {
			isLoading = true;

			addToast(`MIDI file is loading...`, 'info');

			worker = new Worker(new URL('$lib/workers/midiWorker.js', import.meta.url), {
				type: 'module'
			});

			worker.onmessage = (event) => {
				isLoading = false;
				const { success, result, error } = event.data;

				if (success) {
					$midiData = result;
					$filename = midiFile.name;
					$midiLoaded = true;
					addToast(`MIDI file: ${$filename} finished loading.`, 'success');
				} else {
					console.error('MIDI parse error:', error);
					$midiLoaded = false;
					addToast(`MIDI file: ${$filename} failed to load.`, 'fail');
				}

				worker.terminate();
			};

			worker.postMessage(midiFile);
		}
	};

	const triggerFileInput = () => {
		document.getElementById('midi-file').click();
	};

	const unloadFile = () => {
		const midiName = $filename;
		$filename = '';
		$midiData = null;
		$midiLoaded = false;
		document.getElementById('midi-file').value = null;
		addToast(`MIDI file: ${midiName} unloaded successfully.`, 'success');
	};

	$: isLoading;
</script>

<input
	type="file"
	name="midi-file"
	id="midi-file"
	accept=".mid"
	on:change={handleFileChange}
	class="hidden"
/>

<div class={`space-y-4 ${$isSidebarCollapsed ? ' mr-0' : ' mr-4'} hidden lg:block`}>
	<hr class="border-secondary/10" />

	{#if isLoading}
		<Button
			type="button"
			variant="primary"
			wFull={true}
			value={$isSidebarCollapsed ? null : 'Loading File'}
			icon={LoaderCircle}
			animatedIcon={true}
		/>
	{:else}
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
				<Button
					variant="primary"
					onclick={triggerFileInput}
					wFull={true}
					icon={File}
					classes="p-4"
				/>
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
	{/if}
</div>

<div class={`block space-y-4 lg:hidden`}>
	<hr class="border-secondary/10" />
	<!-- FIX this: not showing its loading -->
	{#if isLoading}
		<Button
			type="button"
			variant="primary"
			wFull={true}
			value={'Loading File'}
			icon={LoaderCircle}
			animatedIcon={true}
		/>
	{:else}
		<!-- For the unload midi file button -->
		{#if $midiLoaded}
			<Button
				type="button"
				variant="destructive"
				value="Unload File"
				wFull={true}
				icon={FileX2}
				onclick={unloadFile}
			/>
		{/if}
		<Button
			type="button"
			variant="primary"
			wFull={true}
			onclick={triggerFileInput}
			icon={File}
			value={`${$filename ? $filename : 'Select File'}`}
		/>
	{/if}
</div>
