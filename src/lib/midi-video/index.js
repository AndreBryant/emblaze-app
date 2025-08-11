import { get } from 'svelte/store';
import { PixiPiano } from './classes/piano';
import { NoteCanvas } from './classes/noteCanvas';
import { Conductor } from './classes/conductor';
import { CCapture } from 'ccapture.js-npmfixed';

import { midiData, paused, isRecording } from '../stores/midi-stores';

export const createPixiSketch = async (PIXI, canvas) => {
	const app = new PIXI.Application();
	const ch = 720;
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

	const startKey = 21;
	const numOfKeys = 88;
	const noteCanvas = new NoteCanvas(app, startKey, numOfKeys, 0, 0, scheme);
	await noteCanvas.loadTexture();

	const piano = new PixiPiano(app, startKey, numOfKeys, 0x550055, scheme);
	await piano.initKeys();

	const conductor = new Conductor(app, piano, noteCanvas);

	const capturer = new CCapture({ format: 'webm', frameRate: 60 });
	let recording = get(isRecording);
	let recordingStarted = false;

	isRecording.subscribe((value) => {
		if (!loaded) return;
		recording = value;

		if (value) {
			recordingStarted = false;
		}
	});

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
			const min = 0x22;
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

	setInterval(() => {
		if (loaded) {
			if (recording && !recordingStarted) {
				capturer.start();
				recordingStarted = true;
			}

			if (recording && recordingStarted) {
				app.renderer.render(app.stage);
				capturer.capture(app.canvas);
			}

			if (!recording && recordingStarted) {
				capturer.stop();
				capturer.save();

				recordingStarted = false;
				isRecording.set(false);
			}

			conductor.update(1000 / 60);
		}
	}, 1000 / 60);

	return conductor;
};
