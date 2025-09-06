<script>
	import { changelogs } from '$lib/changelogs';
	import { ChevronDown } from 'lucide-svelte';
	let v = PKG.version;
	let cl = changelogs[v];

	$: cl = changelogs[v];
</script>

<section class="flex flex-col gap-16 text-slate-50/80 backdrop-blur-sm">
	<div class="flex gap-4 border-b border-slate-50/20 pb-4">
		<h2 class="text-xl font-thin">Select Version Update:</h2>
		<div class="relative max-w-96">
			<select
				bind:value={v}
				class="w-80 cursor-pointer appearance-none overflow-ellipsis rounded-sm border border-secondary-dark/20 bg-secondary-acc/10 px-2 py-1 text-secondary-dark hover:bg-secondary-acc/20"
			>
				{#each Object.entries(changelogs) as data}
					<option
						value={data[0]}
						selected={data[0] === v}
						class="flex cursor-pointer gap-4 bg-primary/80 py-2"
					>
						v{data[0]}: {data[1].name}
					</option>
				{/each}
			</select>
			<span class="pointer-events-none absolute right-1 top-1 opacity-80"><ChevronDown /></span>
		</div>
	</div>
	<!-- Header Title -->
	<div class="">
		<h3 class="text-center text-xl font-semibold tracking-wide">
			{cl.name}
			<span class="font-thin"><span class="text-lg">v</span>{v} </span>
		</h3>
		<p class="text-center font-thin text-secondary-dark/70">
			{cl.desc}
		</p>
	</div>

	<div class="flex justify-center">
		<div class="flex w-full flex-col gap-8 lg:w-[50vw] [&>div>p:first-child]:text-secondary/70">
			<!--Status  -->
			<div>
				<p class="text-lg font-semibold uppercase">Status:</p>
				<p class="ml-8 font-thin text-secondary-dark/70">{cl.status}</p>
			</div>

			<!-- Additions -->
			<div>
				<p class="text-lg font-semibold uppercase">Additions:</p>
				<ul class="ml-8 list-disc font-thin text-secondary-dark/70">
					{#each cl.additions as a}
						<li>{a}</li>
					{/each}
				</ul>
			</div>

			<!-- Todos -->
			<div>
				<p class="text-lg font-semibold uppercase">TODO:</p>
				<ul class="ml-8 list-disc font-thin text-secondary-dark/70">
					{#each cl.todo as td}
						<li>{td}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
