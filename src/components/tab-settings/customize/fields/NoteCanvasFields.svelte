<script>
	import { browser } from '$app/environment';
	import { noteCanvas } from '$lib/stores/customize-stores.js';
	import { sessionSettings } from '$lib/stores/session-store.js';

	import ErrorFields from './ErrorFields.svelte';

	const NOTE_SPEED_MIN = 1;
	const NOTE_SPEED_MAX = 4000;

	const INTENSITY_MIN = 0.1;
	const INTENSITY_MAX = 1;

	const TURBULENCE_MIN = 0.1;
	const TURBULENCE_MAX = 1;

	const DENSITY_MIN = 0;
	const DENSITY_MAX = 10;

	const SHOOT_VELOCITY_MIN = 0.1;
	const SHOOT_VELOCITY_MAX = 1;

	let noteCanvasStore = noteCanvas.store;
	let itemField = noteCanvas.itemField;

	const handleSave = (id) => {
		if (browser) {
			const noteCanvasData = {
				sID: id,
				noteCanvas: {
					noteSizing: $sessionSettings['customize']['noteCanvas'].noteSizing,
					noteSpeed: $sessionSettings['customize']['noteCanvas'].noteSpeed,
					noteType: $sessionSettings['customize']['noteCanvas'].noteType,
					keyFlare: {
						enabled: $sessionSettings['customize']['noteCanvas'].keyFlare.enabled,
						type: $sessionSettings['customize']['noteCanvas'].keyFlare.type,
						intensity: $sessionSettings['customize']['noteCanvas'].keyFlare.intensity
					},
					noteParticle: {
						enabled: $sessionSettings['customize']['noteCanvas'].noteParticle.enabled,
						turbulence: $sessionSettings['customize']['noteCanvas'].noteParticle.turbulence,
						particleDensity:
							$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity,
						shootVelocity: $sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity
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
			$sessionSettings['customize']['noteCanvas'].noteSizing = data.noteSizing;
			$sessionSettings['customize']['noteCanvas'].noteSpeed = data.noteSpeed;
			$sessionSettings['customize']['noteCanvas'].noteType = data.noteType;
			$sessionSettings['customize']['noteCanvas'].keyFlare.enabled = data.keyFlare.enabled;
			$sessionSettings['customize']['noteCanvas'].keyFlare.type = data.keyFlare.type;
			$sessionSettings['customize']['noteCanvas'].keyFlare.intensity = data.keyFlare.intensity;
			$sessionSettings['customize']['noteCanvas'].noteParticle.enabled = data.noteParticle.enabled;
			$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence =
				data.noteParticle.turbulence;
			$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity =
				data.noteParticle.shootVelocity;
		}
	};

	const clamp = (min, max, curr) => {
		if (curr < min) return min;
		if (curr > max) return max;
		return curr;
	};

	export { handleSave, handleLoadSetting };
</script>

<div class="flex w-full flex-col gap-4 lg:w-6/12">
	<h3 class="text-lg font-semibold">Note Canvas Settings</h3>
	<table class="w-full table-fixed text-secondary-dark [&>tr]:grid md:[&>tr]:table-row">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Note Sizing: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select
						class="w-full border border-secondary-acc bg-primary px-2 py-1"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteSizing}
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
						min={NOTE_SPEED_MIN}
						max={NOTE_SPEED_MAX}
						class="custom-slider grow"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteSpeed}
						on:input={(e) => {
							$sessionSettings['customize']['noteCanvas'].noteSpeed =
								clamp(NOTE_SPEED_MIN, NOTE_SPEED_MAX, Number(e.target.value)) + '';
						}}
					/>
					<input
						type="number"
						min={NOTE_SPEED_MIN}
						max={NOTE_SPEED_MAX}
						class="flex-1/3 border border-secondary-acc bg-primary"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteSpeed}
						on:input={(e) => {
							if (e.target.value !== '') {
								$sessionSettings['customize']['noteCanvas'].noteSpeed =
									clamp(NOTE_SPEED_MIN, NOTE_SPEED_MAX, Number(e.target.value)) + '';
							} else {
								$sessionSettings['customize']['noteCanvas'].noteSpeed = '0';
							}
						}}
					/>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Note Type</pre>
			</td>
			<select
				class="w-full border border-secondary-acc bg-primary px-2 py-1"
				bind:value={$sessionSettings['customize']['noteCanvas'].noteType}
			>
				<option value="neon-white-outline" selected>Neon (white outline)</option>
				<option value="neon-high-contrast">Neon (higher contrast outline)</option>
				<option value="no-outline">No outline</option>
				<option value="with-gradient">With Gradient</option>
			</select>
		</tr>
		<tr>
			<td class="pb-1 pt-8" colspan="2">
				<div class="flex gap-2">
					<pre>Key Flare: </pre>
					<input
						type="checkbox"
						name=""
						id=""
						bind:checked={$sessionSettings['customize']['noteCanvas'].keyFlare.enabled}
					/>
				</div>
			</td>
		</tr>
		<!-- Disable (opacity-30, pointer events none) this if key flare is not checked  -->
		<tr
			class={`${!$sessionSettings['customize']['noteCanvas'].keyFlare.enabled ? 'pointer-events-none select-none opacity-40' : ''}`}
		>
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
						class="w-full border border-secondary-acc bg-primary px-2 py-1"
						bind:value={$sessionSettings['customize']['noteCanvas'].keyFlare.type}
					>
						<option value="fire" selected>Fire</option>
						<option value="spark">Spark</option>
					</select>
				</div>
			</td>
		</tr>
		<tr
			class={`${!$sessionSettings['customize']['noteCanvas'].keyFlare.enabled ? 'pointer-events-none select-none opacity-40' : ''}`}
		>
			<td class="py-1">
				<div>
					<pre>Intensity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="range"
						min={INTENSITY_MIN}
						max={INTENSITY_MAX}
						step={0.01}
						class="custom-slider grow"
						bind:value={$sessionSettings['customize']['noteCanvas'].keyFlare.intensity}
						on:input={(e) => {
							$sessionSettings['customize']['noteCanvas'].keyFlare.intensity =
								clamp(
									INTENSITY_MIN,
									INTENSITY_MAX,
									Number($sessionSettings['customize']['noteCanvas'].keyFlare.intensity)
								) + '';
						}}
					/>
					<input
						type="number"
						min={INTENSITY_MIN}
						max={INTENSITY_MAX}
						step={0.01}
						class="flex-1/3 border border-secondary-acc bg-primary"
						bind:value={$sessionSettings['customize']['noteCanvas'].keyFlare.intensity}
						on:input={(e) => {
							if (e.target.value !== '') {
								$sessionSettings['customize']['noteCanvas'].keyFlare.intensity =
									clamp(INTENSITY_MIN, INTENSITY_MAX, Number(e.target.value)) + '';
							} else {
								$sessionSettings['customize']['noteCanvas'].keyFlare.intensity = '0';
							}
						}}
					/>
				</div>
			</td>
		</tr>
		<tr>
			<td class="pb-1 pt-8" colspan="2">
				<div class="flex gap-2">
					<pre>Note Particle: </pre>
					<input
						type="checkbox"
						name=""
						id=""
						bind:checked={$sessionSettings['customize']['noteCanvas'].noteParticle.enabled}
					/>
				</div>
			</td>
		</tr>
		<tr
			class={`${!$sessionSettings['customize']['noteCanvas'].noteParticle.enabled ? 'pointer-events-none select-none opacity-40' : ''}`}
		>
			<td class="py-1">
				<div>
					<pre>Turbulence: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="range"
						min={TURBULENCE_MIN}
						max={TURBULENCE_MAX}
						step={0.01}
						class="custom-slider grow"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence}
						on:input={(e) => {
							$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence =
								clamp(TURBULENCE_MIN, TURBULENCE_MAX, Number(e.target.value)) + '';
						}}
					/>
					<input
						type="number"
						min={TURBULENCE_MIN}
						max={TURBULENCE_MAX}
						step={0.01}
						class="flex-1/3 border border-secondary-acc bg-primary"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence}
						on:input={(e) => {
							if (e.target.value !== '') {
								$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence =
									clamp(TURBULENCE_MIN, TURBULENCE_MAX, Number(e.target.value)) + '';
							} else {
								$sessionSettings['customize']['noteCanvas'].noteParticle.turbulence = '0';
							}
						}}
					/>
				</div>
			</td>
		</tr>
		<tr
			class={`${!$sessionSettings['customize']['noteCanvas'].noteParticle.enabled ? 'pointer-events-none select-none opacity-40' : ''}`}
		>
			<td class="py-1">
				<div>
					<pre>Number of Particles per Note: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="range"
						min={DENSITY_MIN}
						max={DENSITY_MAX}
						class="custom-slider grow"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity}
						on:input={(e) => {
							$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity =
								clamp(DENSITY_MIN, DENSITY_MAX, Number(e.target.value)) + '';
						}}
					/>
					<input
						type="number"
						min={DENSITY_MIN}
						max={DENSITY_MAX}
						class="flex-1/3 border border-secondary-acc bg-primary"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity}
						on:input={(e) => {
							if (e.target.value !== '') {
								$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity =
									clamp(DENSITY_MIN, DENSITY_MAX, Number(e.target.value)) + '';
							} else {
								$sessionSettings['customize']['noteCanvas'].noteParticle.particleDensity = '0';
							}
						}}
					/>
				</div>
			</td>
		</tr>
		<tr
			class={`${!$sessionSettings['customize']['noteCanvas'].noteParticle.enabled ? 'pointer-events-none select-none opacity-40' : ''}`}
		>
			<td class="py-1">
				<div>
					<pre>Shoot Velocity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input
						type="range"
						min={SHOOT_VELOCITY_MIN}
						max={SHOOT_VELOCITY_MAX}
						step={0.01}
						class="custom-slider grow"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity}
						on:input={(e) => {
							$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity =
								clamp(SHOOT_VELOCITY_MIN, SHOOT_VELOCITY_MAX, Number(e.target.value)) + '';
						}}
					/>
					<input
						type="number"
						min={SHOOT_VELOCITY_MIN}
						max={SHOOT_VELOCITY_MAX}
						step={0.01}
						class="flex-1/3 border border-secondary-acc bg-primary"
						bind:value={$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity}
						on:input={(e) => {
							if (e.target.value !== '') {
								$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity =
									clamp(SHOOT_VELOCITY_MIN, SHOOT_VELOCITY_MAX, Number(e.target.value)) + '';
							} else {
								$sessionSettings['customize']['noteCanvas'].noteParticle.shootVelocity = '0';
							}
						}}
					/>
				</div>
			</td>
		</tr>
	</table>

	<!-- Error fields -->
	<ErrorFields field="note-canvas" />
</div>
