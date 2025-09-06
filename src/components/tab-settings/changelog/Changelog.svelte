<script>
	import { changelogs } from '$lib/changelogs';
	let v = PKG.version;
	let cl = changelogs[v];

	$: cl = changelogs[v];
</script>

<section class="text-slate-50/80 backdrop-blur-sm">
	<div class="border-b border-slate-50/20 pb-4">
		<h2>Update Version</h2>
		<select bind:value={v} class="max-w-96 overflow-ellipsis text-black">
			{#each Object.entries(changelogs) as data}
				<option value={data[0]} selected={data[0] === v}
					><span>{data[0]}</span>
					<span>{data[1].name}</span></option
				>
			{/each}
		</select>
	</div>
	<div class="">
		<h3 class="text-center text-xl font-semibold uppercase">{cl.name}</h3>
		<p class="text-center text-sm font-thin">
			{cl.desc}
		</p>
	</div>
	<div>
		<p class="text-lg font-semibold uppercase">Status:</p>
		<p class="font-thin">{cl.status}</p>
	</div>

	<div>
		<p class="text-lg font-semibold uppercase">Additions:</p>
		<ul class="ml-8 list-disc font-thin">
			{#each cl.additions as a}
				<li>{a}</li>
			{/each}
		</ul>
	</div>

	<div>
		<p class="text-lg font-semibold uppercase">TODO:</p>
		<ul class="ml-8 list-disc font-thin">
			{#each cl.todo as td}
				<li>{td}</li>
			{/each}
		</ul>
	</div>
</section>
