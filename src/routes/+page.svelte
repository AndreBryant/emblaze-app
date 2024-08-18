<script>
	import Sidebar from '../components/Sidebar.svelte';
	import MainContent from '../components/MainContent.svelte';

	import Information from '../components/tab-settings/information/Information.svelte';
	import Customize from '../components/tab-settings/customize/Customize.svelte';
	import Filters from '../components/tab-settings/filters/Filters.svelte';
	import Render from '../components/tab-settings/render/Render.svelte';
	import SavedSettings from '../components/tab-settings/saved-settings/SavedSettings.svelte';
	import { Info, Settings, Sparkles, Video, Save } from 'lucide-svelte';

	let items = [
		{ logo: Info, label: 'MIDI Information', value: 0, component: Information },
		{ logo: Settings, label: 'Customize', value: 1, component: Customize },
		{ logo: Sparkles, label: 'Filters', value: 2, component: Filters },
		{ logo: Video, label: 'Render/Preview', value: 3, component: Render },
		{ logo: Save, label: 'Saved Settings', value: 4, component: SavedSettings }
	];
</script>

<div class="flex h-full w-full flex-row relative">
	<Sidebar {items} />
	<MainContent {items} />
</div>
