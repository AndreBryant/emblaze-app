<script>
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Note Canvas Settings</h3>
	<table class="table-fixed w-full font-mono text-secondary-dark">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Note Sizing: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select name="" id="" class="bg-primary border border-secondary-acc px-2 py-1 w-full">
						<option value="" selected>Tick Based</option>
						<option value="">Time Based</option>
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
					<input type="number" class="w-32 bg-primary border border-secondary-acc font-mono" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Key Flare: </pre>
					<input type="checkbox" name="" id="" />
				</div>
			</td>
		</tr>
		<!-- Disable (opacity-30, pointer events none) this if key flare is not checked  -->
		<tr>
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
		<tr>
			<td class="py-1">
				<div>
					<pre>Intensity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc font-mono" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="pt-8 pb-1" colspan="2">
				<div class="flex gap-2">
					<pre>Note Particle: </pre>
					<input type="checkbox" name="" id="" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div>
					<pre>Turbulence: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc font-mono" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div>
					<pre>Number of Particles per Note: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc font-mono" />
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div>
					<pre>Shoot Velocity: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="range" class="flex-grow" />
					<input type="number" class="w-32 bg-primary border border-secondary-acc font-mono" />
				</div>
			</td>
		</tr>
	</table>
</div>
