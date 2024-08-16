<script>
	import App from '../components/App.svelte';
	import Information from '../components/tab-settings/Information.svelte';
	import Customize from '../components/tab-settings/Customize.svelte';
	import Filters from '../components/tab-settings/Filters.svelte';
	import Render from '../components/tab-settings/Render.svelte';
	import SavedSettings from '../components/tab-settings/SavedSettings.svelte';
	import { Info, Settings, Sparkles, Video, Save } from 'lucide-svelte';

	let items = [
		{ logo: Info, label: 'MIDI Information', value: 0, component: Information },
		{ logo: Settings, label: 'Customize', value: 1, component: Customize },
		{ logo: Sparkles, label: 'Filters', value: 2, component: Filters },
		{ logo: Video, label: 'Render/Preview', value: 3, component: Render },
		{ logo: Save, label: 'Saved Settings', value: 4, component: SavedSettings }
	];
</script>

<div class="flex w-full h-full">
	<App {items} />
</div>
