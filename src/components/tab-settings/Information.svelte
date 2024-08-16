<script>
	import Table from './information/Table.svelte';

	export let midiData = null;

	let headerData = {};
	let durationData = {};
	let tracksData = {};
	let noteCount = 0;

	$: {
		if (midiData) {
			headerData.head = 'Header Information';
			headerData.properties = [
				{ Name: midiData.header.name },
				{ 'Tempo Events': midiData.header.tempos.length },
				{ 'Time Signatures': midiData.header.timeSignatures.length },
				{ PPQ: midiData.header.ppq }
			];

			durationData.head = 'Duration';
			durationData.properties = [{ Value: midiData.duration + ' seconds' }];

			noteCount = 0;
			midiData.tracks.forEach((track) => {
				if (track.notes) {
					noteCount += track.notes.length;
				}
			});

			tracksData.head = 'Tracks Information';
			tracksData.properties = [
				{ 'Track Count': midiData.tracks.length },
				{ 'Note Count': noteCount }
			];
		}
	}
</script>

<div class="flex flex-col gap-8 w-full">
	<h2 class="text-xl">MIDI Information</h2>
	{#if midiData}
		<div class="flex flex-col gap-4 overflow-auto mr-8">
			<!-- <pre>{JSON.stringify(midiData, null, 2)}</pre> -->
			<ul class="flex flex-col gap-8">
				<li>
					<h3 class="text-lg font-semibold">File Info</h3>
					<div>
						<p>File name: {midiData}</p>
					</div>
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
	{:else}
		<div class="flex flex-col gap-4">
			<p>No MIDI Loaded</p>
		</div>
	{/if}
</div>
