<script>
	const handleSave = (id) => {
		console.log('video fields receives customize save', id);
	};
	const handleLoadSetting = (id) => {
		console.log('video load', id);
	};

	export { handleSave, handleLoadSetting };
</script>

<div class="w-full lg:w-5/12 flex flex-col gap-4">
	<h3 class="text-lg font-semibold">Video Settings</h3>
	<table class="table-fixed w-full font-mono text-secondary-dark">
		<tr>
			<td class="py-1">
				<div>
					<pre>Quality: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<select name="" id="" class="bg-primary border border-secondary-acc px-2 py-1 w-full">
						<option value="">360p</option>
						<option value="" selected>720p</option>
						<option value="">1080p</option>
						<option value="">4k</option>
						<option value="">8k</option>
					</select>
				</div>
			</td>
		</tr>
		<tr>
			<td class="py-1">
				<div class="flex items-center">
					<pre>Frame Rate: </pre>
				</div>
			</td>
			<td>
				<div class="flex gap-4">
					<input type="number" class=" bg-primary border border-secondary-acc font-mono w-full" />
				</div>
			</td>
		</tr>
	</table>
</div>
