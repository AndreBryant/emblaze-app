<script>
	import { ids, piano, noteCanvas, colorScheme, video } from '$lib/stores/customize-stores.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
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

	const fetchDataFromLocalStorage = () => {
		if (browser) {
			// id
			let data = localStorage.getItem(idField) || '[]';
			let dataStr = JSON.parse(data).filter((id) => id !== 'default');
			$idStore = $idStore
				.concat(dataStr)
				.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t.id === value.id && t.desc === value.desc)
				);

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

	onMount(() => {
		fetchDataFromLocalStorage();
	});
</script>

<div class="flex flex-col gap-8">
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
