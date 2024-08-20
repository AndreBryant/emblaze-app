import { writable } from 'svelte/store';

const field = 'emblaze-';

// [
// ... settingIDs
// ]
const settingIDs = writable(['default']);

// [{sID, piano}, {sID, piano}, {sID, piano}, ...]
const pianoDefault = {
	sID: 'default',
	piano: {
		pianoRimColor: '#C27803',
		pianoBlazeColor: '#C27803',
		numOfKeys: '88',
		startKey: '21',
		lastKey: '108'
	}
};
const cPiano = writable([pianoDefault]);

// [{sID, noteCanvas}, {sID, noteCanvas}, {sID, noteCanvas}, ...]
const cNoteCanvas = writable([]);

// [{sID, colorScheme}, {sID, colorScheme}, {sID, colorScheme}, ...]
const cColorScheme = writable([]);

// [{sID, video}, {sID, video}, {sID, video}, ...]
const videoDefault = {
	sID: 'default',
	video: {
		quality: '1',
		fps: '30'
	}
};
const cVideo = writable([videoDefault]);

// if null, load default settings
const cLoadedSetting = writable(null);

const ids = {
	itemField: field + 'settingIDs',
	store: settingIDs
};

const piano = {
	itemField: field + 'cpiano',
	store: cPiano
};

const noteCanvas = {
	itemField: field + 'cNoteCanvas',
	store: cNoteCanvas
};

const colorScheme = {
	item: field + 'cColorScheme',
	store: cColorScheme
};

const video = {
	item: field + 'cVideo',
	store: cVideo
};

const loadedSetting = {
	itemField: field + 'cLoadedSetting',
	store: cLoadedSetting
};

const hasError = writable({ value: false, errors: [] });

export { ids, piano, noteCanvas, colorScheme, video, loadedSetting, hasError };
