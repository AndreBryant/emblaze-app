import { writable } from 'svelte/store';
import { browser } from '$app/environment';
/**
 * TODO: Separate Default values
 *
 */
const field = 'emblaze-';

function loadFromStorage(key, fallback) {
	if (!browser) return fallback;

	try {
		const raw = localStorage.getItem(key);
		if (raw) {
			const parsed = JSON.parse(raw);
			return parsed;
		}
	} catch (err) {
		console.error(`Failed to load ${key} from local storage`, err);
	}
	return fallback;
}

// [
// ... {id, desc}
// ]
const settingIDs = writable(loadFromStorage(field + 'settingIDs', [{ id: 'default', desc: null }]));

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
const cPiano = writable(loadFromStorage(field + 'cPiano', [pianoDefault]));

// [{sID, noteCanvas}, {sID, noteCanvas}, {sID, noteCanvas}, ...]
const noteCanvasDefault = {
	sID: 'default',
	noteCanvas: {
		noteSizing: 'Tick Based',
		noteSpeed: '1',
		noteType: 'No Outline',
		keyFlare: {
			enabled: false,
			type: 'fire',
			intensity: 0
		},
		noteParticle: {
			enabled: false,
			turbulence: 0,
			particleDensity: 0,
			shootVelocity: 0
		}
	}
};
const cNoteCanvas = writable([noteCanvasDefault]);

// [{sID, colorScheme}, {sID, colorScheme}, {sID, colorScheme}, ...]
const colorSchemeDefault = {
	sID: 'default',
	colorScheme: {
		colorBy: 'track',
		colorGeneration: 'random'
	}
};
const cColorScheme = writable([colorSchemeDefault]);

// [{sID, video}, {sID, video}, {sID, video}, ...]
const videoDefault = {
	sID: 'default',
	video: {
		quality: '360p',
		fps: '30'
	}
};
const cVideo = writable(loadFromStorage(field + 'cVideo', [videoDefault]));

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

const hasError = writable({ value: false, errors: [] });

export { ids, piano, noteCanvas, colorScheme, video, loadedSetting, hasError };
