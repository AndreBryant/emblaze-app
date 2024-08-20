import { writable } from 'svelte/store';

const key = 'emblaze-'; //'emblaze-' +  storeName
const field = 'emblaze-';

const settingIDs = writable(['default']);

// [
// ... settingIDs
// ]

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
const cNoteCanvas = writable(null);

// [{sID, colorScheme}, {sID, colorScheme}, {sID, colorScheme}, ...]
const cColorScheme = writable(null);

// [{sID, video}, {sID, video}, {sID, video}, ...]
const cVideo = writable(null);

const cLoadedSetting = writable(null);
// if null, load default settings

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
