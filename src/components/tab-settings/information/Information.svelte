<script>
	import { midiData, filename } from '$lib/stores/midi-stores.js';
	import NoFileLoaded from '../../NoFileLoaded.svelte';
	import Table from './Table.svelte';

	let fileData = {};
	let headerData = {};
	let durationData = {};
	let tracksData = {};
	let noteCount = 0;

	$: {
		if ($midiData) {
			fileData.head = 'File Information';
			fileData.properties = [{ Filename: $filename }];

			headerData.head = 'Header Information';
			headerData.properties = [
				{ Name: $midiData.header.name },
				{ 'Tempo Events': $midiData.header.tempos.length },
				{ 'Time Signatures': $midiData.header.timeSignatures.length },
				{ PPQ: $midiData.header.ppq }
			];

			durationData.head = 'Duration';
			durationData.properties = [{ Value: $midiData.duration + ' seconds' }];

			noteCount = 0;
			$midiData.tracks.forEach((track) => {
				if (track.notes) {
					noteCount += track.notes.length;
				}
			});

			tracksData.head = 'Tracks Information';
			tracksData.properties = [
				{ 'Track Count': $midiData.tracks.length },
				{ 'Note Count': noteCount }
			];
		}
	}
</script>

<div class="flex flex-col gap-8 w-full backdrop-blur-sm">
	<h2 class="text-xl font-semibold">MIDI Information</h2>
	{#if !$midiData}
		<NoFileLoaded />
	{:else}
		<div class="flex flex-col gap-4 mr-8">
			<pre>{JSON.stringify($midiData, null, 2)}</pre>
			<ul class="flex flex-col gap-8 w-full lg:w-[30vw]">
				<li>
					<Table data={fileData} />
				</li>
				<li>
					<Table data={headerData} />
				</li>
				<li>
					<Table data={durationData} />
				</li>
				<li>
					<Table data={tracksData} />
				</li>
			</ul>
		</div>
	{/if}
</div>
