import { get } from 'svelte/store';
import { PixiPiano } from './classes/piano';
import { NoteCanvas } from './classes/noteCanvas';
import { Conductor } from './classes/conductor';

import { midiData, filename, midiLoaded, paused } from '../stores/midi-stores';

export const createPixiSketch = async (PIXI, canvas) => {
	const app = new PIXI.Application();
	const ch = 360;
	const cw = (ch * 16) / 9;
	await app.init({
		canvas: canvas,
		width: cw,
		height: ch,
		backgroundAlpha: 0.95,
		background: 0x111111,
		antialias: false,
		preferWebGL: true
	});

	let scheme = [];
	let loaded = false;

	const noteCanvas = new NoteCanvas(app, 21, 88, 0, 0, scheme);
	await noteCanvas.loadTexture();

	const piano = new PixiPiano(app, 21, 88, 0x550055, scheme);
	await piano.initKeys();

	const conductor = new Conductor(app, piano, noteCanvas);

	paused.subscribe(() => {
		conductor.setPause(get(paused));
	});

	midiData.subscribe(() => {
		if (!get(midiData)) {
			loaded = false;
			conductor.reset();
			return;
		}

		scheme = Array.from({ length: get(midiData).tracks.length }, () => {
			const min = 0x11;
			const max = 0xaa;

			const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
			const r = randRange(min, max) << (4 * 0);
			const g = randRange(min, max) << (4 * 2);
			const b = randRange(min, max) << (4 * 4);

			return r | g | b;
		});

		conductor.updateMidiData();
		conductor.updateColorScheme(scheme);
		loaded = true;
	});

	app.ticker.maxFPS = 60;

	app.ticker.add((ticker) => {
		if (!loaded) return;
		conductor.update(ticker.deltaTime * (1000 / ticker.maxFPS));
	});

	return conductor;
};
