<script>
	import Sidebar from '../components/Sidebar.svelte';
	import MainContent from '../components/MainContent.svelte';

	import Information from '../components/tab-settings/information/Information.svelte';
	import Customize from '../components/tab-settings/customize/Customize.svelte';
	import Filters from '../components/tab-settings/filters/Filters.svelte';
	import Audio from '../components/tab-settings/audio/Audio.svelte';
	import Render from '../components/tab-settings/render/Render.svelte';
	import SavedSettings from '../components/tab-settings/saved-settings/SavedSettings.svelte';
	import { Info, Settings, Sparkles, Music, Video, Save, History } from 'lucide-svelte';
	import Changelog from '../components/tab-settings/changelog/Changelog.svelte';

	let items = [
		{
			logo: Info,
			label: 'MIDI Information',
			subtitle: 'Specific details about the MIDI file.',
			value: 0,
			component: Information
		},
		{
			logo: Settings,
			label: 'Customize',
			subtitle: 'Set the MIDI video configuration.',
			value: 1,
			component: Customize
		},
		{
			logo: Sparkles,
			label: 'Filters',
			subtitle: 'Add filters and other effects',
			value: 2,
			component: Filters
		},
		{
			logo: Music,
			label: 'Audio',
			subtitle: 'Configure the audio for the video.',
			value: 3,
			component: Audio
		},
		{
			logo: Video,
			label: 'Render/Preview',
			subtitle: 'See how your video looks like before rendering.',
			value: 4,
			component: Render
		},
		{
			logo: Save,
			label: 'Saved Settings',
			subtitle:
				'Here are your saved settings (these are stored in the local storage of the browser)',
			value: 5,
			component: SavedSettings
		},
		{
			logo: History,
			label: 'Changelog',
			subtitle: 'Browse update changelogs',
			value: 6,
			component: Changelog
		}
	];
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="flame.png" />
	<title>MIDI Renderer</title>
</svelte:head>

<div class="relative flex h-full w-full flex-col lg:flex-row">
	<Sidebar {items} />
	<MainContent {items} />
</div>
