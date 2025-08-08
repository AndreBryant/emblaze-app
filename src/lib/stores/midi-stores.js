import { writable } from 'svelte/store';

export const midiData = writable(null);

export const filename = writable(null);

export const midiLoaded = writable(false);

export const paused = writable(true);

export const recording = writable(true);

export const leftSeekSignal = writable(false);
