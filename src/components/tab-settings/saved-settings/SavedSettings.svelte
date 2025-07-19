<script>
	import {
		ids,
		piano,
		noteCanvas,
		colorScheme,
		video,
		loadedSetting
	} from '$lib/stores/customize-stores.js';
	let pianoSettings;
	let videoSettings;
	let colorSettings;
	let noteCanvasSettings;

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

	let loaded;
	$: loaded = loadedSetting.store;
</script>

<div class="flex flex-col gap-8">
	<p>{$loaded}</p>
	<div class="w-full lg:w-[50vw]">
		<h4>Manage Saved Customizations</h4>

		<!-- List of saved setting -->
		<table class="table-auto w-full">
			<thead class="bg-secondary-acc">
				<tr>
					<th></th>
					<th class="border">Name</th>
					<th class="border">Description</th>
					<th class="border">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each $idStore as id}
					<tr>
						<td>c</td>
						<td>{id.id}</td>
						<td>{id.desc ? id.desc : 'no description provided'}</td>
						<td>Delete</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div>Manage Saved Filters</div>
	<div>Manage Saved Audio Configuraitons</div>
</div>
