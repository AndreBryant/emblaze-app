import { writable } from 'svelte/store';
import { loadFromStorage } from './load-from-storage.js';
import {
	defaultSettingIDs,
	defaultPianoFields,
	defaultNoteCanvas,
	defaultColorScheme,
	defaultVideoFields
} from './customize-default.js';
const field = 'emblaze-';

const settingIDs = writable(loadFromStorage(field + 'settingIDs', defaultSettingIDs));

const cPiano = writable(loadFromStorage(field + 'cPiano', defaultPianoFields));

const cNoteCanvas = writable(loadFromStorage(field + 'cNoteCanvas', defaultNoteCanvas));

const cColorScheme = writable(loadFromStorage(field + 'cColorScheme', defaultColorScheme));

const cVideo = writable(loadFromStorage(field + 'cVideo', defaultVideoFields));

// if null, load default settings
const cLoadedSetting = writable('default');

const ids = {
	itemField: field + 'settingIDs',
	store: settingIDs
};

const piano = {
	itemField: field + 'cPiano',
	store: cPiano
};

const noteCanvas = {
	itemField: field + 'cNoteCanvas',
	store: cNoteCanvas
};

const colorScheme = {
	itemField: field + 'cColorScheme',
	store: cColorScheme
};

const video = {
	itemField: field + 'cVideo',
	store: cVideo
};

const loadedSetting = {
	itemField: field + 'cLoadedSetting',
	store: cLoadedSetting
};

const hasError = writable({
	'save-current': { value: false, errors: [] },
	'piano-fields': { value: false, errors: [] },
	'note-canvas': { value: false, errors: [] },
	'color-scheme': { value: false, errors: [] },
	'video-fields': { value: false, errors: [] }
});

export { ids, piano, noteCanvas, colorScheme, video, loadedSetting, hasError };
