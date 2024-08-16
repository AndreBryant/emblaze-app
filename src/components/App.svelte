<script>
	import AppTitle from './AppTitle.svelte';
	import TabTrigger from './TabTrigger.svelte';
	import TabContent from './TabContent.svelte';
	import FileInput from './FileInput.svelte';
	export let items = [];
	export let activeTabValue = 0;

	let midiData;

	const handleMidiLoaded = (e) => {
		midiData = e.detail.midiData;
	};

	const handleMidiUnloaded = () => {
		midiData = null;
	};

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<div class="flex flex-row w-full">
	<div
		class="p-8 flex flex-col gap-8 w-64 border-r border-r-secondary border-opacity-30 fixed h-full"
	>
		<AppTitle>MIDI App</AppTitle>
		<div class="flex-grow">
			<ul class="flex flex-col gap-4">
				{#each items as item}
					<TabTrigger
						logo={item.logo}
						label={item.label}
						active={activeTabValue === item.value}
						onClick={handleClick(item.value)}
					/>
				{/each}
			</ul>
		</div>
		<div class=" ">
			<FileInput on:midiFileLoad={handleMidiLoaded} on:midiFileUnloaded={handleMidiUnloaded} />
		</div>
	</div>

	<div class="flex-grow ml-64">
		{#each items as item}
			{#if activeTabValue === item.value}
				<TabContent component={item.component} props={{ midiData }} />
			{/if}
		{/each}
	</div>
</div>
