<script>
	const handleSave = (id) => {
		console.log('note canvas fields receives customize save', id);
	};
	const handleLoadSetting = (id) => {
		console.log('note canvas load', id);
	};

	let noteSizing = '0';
	let noteSpeed = '10';
	let noteType = '0';
	let keyFlare = false;
	let noteParticle = false;
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
					<select class="bg-primary border border-secondary-acc px-2 py-1 w-full">
						<option value="0" selected>Tick Based</option>
						<option value="1">Time Based</option>
					</select>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Note Speed: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Note Type</pre>
			</td>
			<select class="bg-primary border border-secondary-acc px-2 py-1 w-full">
				<option value="0" selected>Neon (white outline)</option>
				<option value="1">Neon (higher contrast outline)</option>
				<option value="2">No outline</option>
				<option value="3">With Gradient</option>
			</select>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Key Flare: </pre>
					<input type="checkbox" name="" id="" bind:checked={keyFlare} />
				</div>
			</td>
		</tr>
		<!-- Disable (opacity-30, pointer events none) this if key flare is not checked  -->
		<tr class={`${!keyFlare ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Type: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select name="" id="" class="bg-primary border border-secondary-acc px-2 py-1 w-full">
						<option value="" selected>Fire</option>
						<option value="">Spark</option>
						<option value="">More idk</option>
					</select>
				</div>
			</td>
		</tr>
		<tr class={`${!keyFlare ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Intensity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Note Particle: </pre>
					<input type="checkbox" name="" id="" bind:checked={noteParticle} />
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticle ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Turbulence: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc" />
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticle ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Number of Particles per Note: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc" />
				</div>
			</td>
		</tr>
		<tr class={`${!noteParticle ? 'pointer-events-none opacity-40 select-none' : ''}`}>
			<td class="py-1">
				<div>
					<pre>Shoot Velocity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc" />
				</div>
			</td>
		</tr>
	</table>
</div>
