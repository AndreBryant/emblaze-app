import { writable } from 'svelte/store';
import {
	defaultPianoFields,
	defaultColorScheme,
	defaultNoteCanvas,
	defaultVideoFields
} from './customize-default';

export const sessionSettings = writable({
	customize: {
		pianoFields: { ...defaultPianoFields[0].piano },
		colorScheme: { ...defaultColorScheme[0].colorScheme },
		noteCanvas: { ...defaultNoteCanvas[0].noteCanvas },
		videoFields: { ...defaultVideoFields[0].video }
	},
	filters: {},
	audio: {}
});
