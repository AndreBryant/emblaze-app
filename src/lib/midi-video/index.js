import { get } from 'svelte/store';
import { PixiPiano } from './classes/piano';
import { NoteCanvas } from './classes/noteCanvas';
import { Conductor } from './classes/conductor';
import { CCapture } from 'ccapture.js-npmfixed';

import { midiData, paused, isRecording } from '../stores/midi-stores';
import { sessionSettings } from '../stores/session-store';

export const createPixiSketch = async (PIXI, canvas) => {
	const app = new PIXI.Application();
	const { quality, fps } = get(sessionSettings).customize.videoFields;
	let ch;

	switch (quality) {
		case '360p':
			ch = 360;
			break;
		case '720p':
			ch = 720;
			break;
		case '1080p':
			ch = 1080;
			break;
		case '4k':
			ch = 2160;
			break;
		case '8k':
			ch = 4320;
			break;
	}

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
	const rimColor = Number(
		get(sessionSettings).customize.pianoFields.pianoRimColor.replace('#', '0x')
	);

	const noteCanvas = new NoteCanvas(app, startKey, numOfKeys, 0, 0, scheme);
	await noteCanvas.loadTexture();

	const piano = new PixiPiano(app, startKey, numOfKeys, rimColor, scheme);
	await piano.initKeys();

	const conductor = new Conductor(app, piano, noteCanvas);

	let capturer = new CCapture({ format: 'webm', framerate: fps });
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

		const count =
			get(sessionSettings).customize.colorScheme.colorBy === 'track'
				? get(midiData).tracks.length
				: 16;

		scheme = Array.from({ length: count }, () => {
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

			conductor.update(1000 / fps);
		}
	}, 1000 / fps);

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
