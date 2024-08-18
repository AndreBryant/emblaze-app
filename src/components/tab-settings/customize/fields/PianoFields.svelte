<script>
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Piano Settings</h3>
	<table class="table-fixed w-full font-mono text-secondary-dark">
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Piano Rim Color: </pre>
					<input
						type="color"
						class="w-8 h-8 bg-transparent border-secondary-acc border rounded-md"
						value="#C27803"
					/>
				</div>
			</td>
			<td>
				<div class="flex gap-4 col-span-6">
					<input type="checkbox" checked />
					<div class="flex items-center">
						<pre>Piano Blaze Color: </pre>
						<input
							type="color"
							class="w-8 h-8 bg-transparent border-secondary-acc border rounded-md"
							value="#C27803"
						/>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Number of Keys: </pre>
			</td>
			<td>
				<select name="" id="" class="bg-primary border border-secondary-acc px-2 py-1 w-full">
					<option value="" selected>61</option>
					<option value="">88</option>
					<option value="">128</option>
					<option value="">Custom</option>
				</select>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Start Key: </pre>
			</td>
			<td>
				<input
					type="number"
					value="0"
					class="bg-primary border border-secondary-acc px-2 py-1 w-full"
				/>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<pre>Last Key: </pre>
			</td>
			<td>
				<input
					type="number"
					value="0"
					class="bg-primary border border-secondary-acc px-2 py-1 w-full"
				/>
			</td>
		</tr>
	</table>
</div>
