<script>
	import Button from '../../Buttons/Button.svelte';
</script>

<!-- Save current Setting -->
<div class="w-full lg:w--5/12 flex flex-col gap-2">
	<h3 class="text-lg font-semibold">Save Current Settings</h3>
	<div class="flex gap-2 items-center w-full lg:w-5/12 font-mono text-secondary-dark">
		<div>
			<Button variant="primary">Save</Button>
		</div>
		<input
			type="text"
			name=""
			id=""
			placeholder="name the setting"
			class="bg-primary border border-secondary-acc px-2 py-1 w-full"
		/>
	</div>
	<div>
		<p class="opacity-60 font-mono text-sm">
			Saving overwrites existing setting with the same name.
		</p>
	</div>
</div>
