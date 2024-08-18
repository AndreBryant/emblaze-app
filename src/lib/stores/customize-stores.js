import { writable } from 'svelte/store';

// Fetch these from local storage

const savedSettingNames = writable(null);

const cPiano = writable(null);

const cNoteCanvas = writable(null);

const cColorScheme = writable(null);

const cVideo = writable(null);

export { cPiano, cNoteCanvas, cColorScheme, cVideo };
