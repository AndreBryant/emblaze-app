import { writable } from 'svelte/store';

export const midiData = writable(null);

export const filename = writable(null);

export const midiLoaded = writable(false);
