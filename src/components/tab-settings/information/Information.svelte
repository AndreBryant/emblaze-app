<script>
	import { midiData, filename } from '$lib/stores/midi-stores.js';
	import NoFileLoaded from './NoFileLoaded.svelte';
	import Table from './Table.svelte';

	let fileData = {};
	let headerData = {};
	let tempoEvents = {};
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

			tempoEvents.head = 'Tempo Events';
			const tempoEventLength = $midiData.header.tempos.length;
			tempoEvents.properties = [
				{ Count: tempoEventLength + ' tempo event' + (tempoEventLength === 1 ? '' : 's') }
			];

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

<div class="flex w-full flex-col gap-8 backdrop-blur-sm">
	{#if !$midiData}
		<NoFileLoaded />
	{:else}
		<div class="mr-8 flex flex-col gap-4">
			<!-- <pre>{JSON.stringify($midiData, null, 2)}</pre> -->
			<ul class="flex w-full flex-col gap-8 lg:w-[30vw]">
				<li>
					<Table data={fileData} />
				</li>
				<li>
					<Table data={headerData} />
				</li>
				<li>
					<Table data={tempoEvents} />
				</li>
				<li>
					<Table data={tracksData} />
				</li>
			</ul>
		</div>
	{/if}
</div>
