import { get } from 'svelte/store';
import { PixiPiano } from './classes/piano';
import { NoteCanvas } from './classes/noteCanvas';
import { Conductor } from './classes/conductor';
import { CCapture } from 'ccapture.js-npmfixed';

import { midiData, paused, isRecording } from '../stores/midi-stores';
import { sessionSettings } from '../stores/session-store';

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

	const startKey = Number(get(sessionSettings)['customize']['pianoFields'].startKey);
	const lastKey = Number(get(sessionSettings)['customize']['pianoFields'].lastKey);
	const keyCountData = Number(get(sessionSettings)['customize']['pianoFields'].numOfKeys);
	const numOfKeys = keyCountData === -1 ? lastKey - startKey + 1 : keyCountData;

	const noteCanvas = new NoteCanvas(app, startKey, numOfKeys, 0, 0, scheme);
	await noteCanvas.loadTexture();

	const piano = new PixiPiano(app, startKey, numOfKeys, 0x550055, scheme);
	await piano.initKeys();

	const conductor = new Conductor(app, piano, noteCanvas);

	let capturer = new CCapture({ format: 'webm', frameRate: 60 });
	let recording = get(isRecording);
	let isCapturing = false;

	const unsubIsRecording = isRecording.subscribe((value) => {
		if (!loaded) return;
		recording = value;
		paused.set(!value);
	});

	const unsubPaused = paused.subscribe(() => {
		conductor.setPause(get(paused));
	});

	const unsubMidiData = midiData.subscribe(() => {
		if (!get(midiData)) {
			loaded = false;
			conductor.reset();
			return;
		}

		scheme = Array.from({ length: get(midiData).tracks.length }, () => {
			const min = 0x55;
			const max = 0xdd;

			const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
			const r = randRange(min, max) << 16;
			const g = randRange(min, max) << 8;
			const b = randRange(min, max);

			return r | g | b;
		});

		conductor.updateMidiData();
		conductor.updateColorScheme(scheme);
		loaded = true;
	});

	const intervalId = setInterval(() => {
		if (loaded) {
			if (recording && !isCapturing) {
				capturer.start();
				isCapturing = true;
			}

			if (recording && isCapturing) {
				app.renderer.render(app.stage);
				capturer.capture(app.canvas);
			}

			if (!recording && isCapturing) {
				capturer.stop();
				capturer.save();

				isCapturing = false;
				isRecording.set(false);
			}

			conductor.update(1000 / 60);
		}
	}, 1000 / 60);

	const cleanup = () => {
		clearInterval(intervalId);
		capturer.stop();
		capturer = null;

		unsubIsRecording();
		unsubPaused();
		unsubMidiData();
		app.destroy(true, { children: true });
	};

	return { conductor, cleanup };
};
