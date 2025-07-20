<script>
	import { noteCanvas } from '$lib/stores/customize-stores.js';
	import { browser } from '$app/environment';

	import ErrorFields from './ErrorFields.svelte';

	const noteSpeedMin = 1;
	const noteSpeedMax = 4000;

	let noteSizing = 'tick-based';
	let noteSpeed = '5';
	let noteType = 'no-outline';

	let keyFlareEnabled = false;
	let keyFlareType = 'fire';
	let keyFlareIntensity = '0';

	let noteParticleEnabled = false;
	let noteParticleTurbulence = '0';
	let noteParticleDensity = '0';
	let noteParticleShootVelocity = '0';

	let noteCanvasStore = noteCanvas.store;
	let itemField = noteCanvas.itemField;

	const handleSave = (id) => {
		if (browser) {
			const noteCanvasData = {
				sID: id,
				noteCanvas: {
					noteSizing,
					noteSpeed,
					noteType,
					keyFlare: {
						enabled: keyFlareEnabled,
						type: keyFlareType,
						intensity: keyFlareIntensity
					},
					noteParticle: {
						enabled: noteParticleEnabled,
						turbulence: noteParticleTurbulence,
						particleDensity: noteParticleDensity,
						shootVelocity: noteParticleShootVelocity
					}
				}
			};

			let arr = $noteCanvasStore.slice();
			arr = arr.filter((p) => p.sID !== id);
			arr.push(noteCanvasData);

			const dataString = JSON.stringify(arr);
			localStorage.setItem(itemField, dataString);
			$noteCanvasStore = JSON.parse(localStorage.getItem(itemField));
		}
	};
	const handleLoadSetting = (id) => {
		if (browser) {
			const data = $noteCanvasStore.filter((piano) => piano.sID === id)[0]['noteCanvas'];
			noteSizing = data.noteSizing;
			noteSpeed = data.noteSpeed;
			noteType = data.noteType;

			keyFlareEnabled = data.keyFlare.enabled;
			keyFlareType = data.keyFlare.type;
			keyFlareIntensity = data.keyFlare.intensity;

			noteParticleEnabled = data.noteParticle.enabled;
			noteParticleTurbulence = data.noteParticle.turbulence;
			noteParticleShootVelocity = data.noteParticle.shootVelocity;
		}
	};

	$: {
		if (Number(noteSpeed) < noteSpeedMin) noteSpeed = '' + noteSpeedMin;
		if (Number(noteSpeed) > noteSpeedMax) noteSpeed = '' + noteSpeedMax;
	}

	export { handleSave, handleLoadSetting };
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Note Canvas Settings</h3>
	<table class="table-fixed w-full text-secondary-dark">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Note Sizing: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select
						class="bg-primary border border-secondary-acc px-2 py-1 w-full"
						bind:value={noteSizing}
					>
						<option value="tick-based" selected>Tick Based</option>
						<option value="time-based">Time Based</option>
					</select>
				</div>
			</td>
		</tr>
		<!-- Handle cases here later -->
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Note Speed:</pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="range"
						min={noteSpeedMin}
						max={noteSpeedMax}
						class="flex-grow"
						bind:value={noteSpeed}
					/>
					<input
						type="number"
						min={noteSpeedMin}
						max={noteSpeedMax}
						class="w-32 bg-primary border border-secondary-acc"
						bind:value={noteSpeed}
					/>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Note Type</pre>
			</td>
			<select class="bg-primary border border-secondary-acc px-2 py-1 w-full" bind:value={noteType}>
				<option value="neon-white-outline" selected>Neon (white outline)</option>
				<option value="neon-high-contrast">Neon (higher contrast outline)</option>
				<option value="no-outline">No outline</option>
				<option value="with-gradient">With Gradient</option>
			</select>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Key Flare: </pre>
					<input type="checkbox" name="" id="" bind:checked={keyFlareEnabled} />
				</div>
			</td>
		</tr>
		<!-- Disable (opacity-30, pointer events none) this if key flare is not checked  -->
		<tr class={`${!keyFlareEnabled ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Type: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select
						name=""
						id=""
						class="bg-primary border border-secondary-acc px-2 py-1 w-full"
						bind:value={keyFlareType}
					>
						<option value="fire" selected>Fire</option>
						<option value="spark">Spark</option>
					</select>
				</div>
			</td>
		</tr>
		<tr class={`${!keyFlareEnabled ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Intensity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" bind:value={keyFlareIntensity} />
					<input
						type="number"
						class="w-32 bg-primary border border-secondary-acc"
						bind:value={keyFlareIntensity}
					/>
				</div>
			</td>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Note Particle: </pre>
					<input type="checkbox" name="" id="" bind:checked={noteParticleEnabled} />
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticleEnabled ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Turbulence: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" bind:value={noteParticleTurbulence} />
					<input
						type="number"
						class="w-32 bg-primary border border-secondary-acc"
						bind:value={noteParticleTurbulence}
					/>
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticleEnabled ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Number of Particles per Note: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" bind:value={noteParticleDensity} />
					<input
						type="number"
						class="w-32 bg-primary border border-secondary-acc"
						bind:value={noteParticleDensity}
					/>
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticleEnabled ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Shoot Velocity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" bind:value={noteParticleShootVelocity} />
					<input
						type="number"
						class="w-32 bg-primary border border-secondary-acc"
						bind:value={noteParticleShootVelocity}
					/>
				</div>
			</td>
		</tr>
	</table>

	<!-- Error fields -->
	<ErrorFields field="note-canvas" />
</div>
