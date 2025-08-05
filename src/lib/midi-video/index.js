import { get } from 'svelte/store';
import { PixiPiano } from './classes/piano';
import { NoteCanvas } from './classes/noteCanvas';
import { Conductor } from './classes/conductor';

import { midiData, filename, midiLoaded, paused } from '../stores/midi-stores';

export const createPixiSketch = async (PIXI, canvas) => {
	const app = new PIXI.Application();

	await app.init({
		canvas: canvas,
		width: 1280,
		height: 720,
		backgroundAlpha: 0.95,
		background: 0x111111,
		preferWebGL: true
	});

	let scheme = [];
	const noteCanvas = new NoteCanvas(app, 0, 128, 0, 0, scheme);
	const piano = new PixiPiano(app, 0, 128, 0x550055, scheme);
	const conductor = new Conductor(piano, noteCanvas);

	paused.subscribe(() => {
		conductor.setPause(get(paused));
	});

	midiData.subscribe(() => {
		if (!get(midiData)) {
			conductor.reset();
			return;
		}

		scheme = Array.from({ length: get(midiData).tracks.length }, () =>
			Math.floor(Math.random() * 16777215)
		);

		conductor.updateMidiData();
		conductor.updateColorScheme(scheme);
	});

	app.ticker.maxFPS = 60; //change this dynamically later

	app.ticker.add((ticker) => {
		// if (!get(midiLoaded)) return;
		const deltaTimeMs = ticker.deltaTime * (1000 / ticker.maxFPS);

		conductor.update(deltaTimeMs);
	});
};

// export const createSketch = (p5, parent) => {
// 	const sketch = (p) => {
// 		p.piano;

// 		p.setup = () => {
// 			p.createCanvas(1280, 720);
// 			p.piano = new Piano(p, 0, 128, [85, 0, 85], null);
// 			p.canvas.style.height = '100%';
// 			p.canvas.style.width = '100%';
// 		};

// 		p.draw = () => {
// 			p.piano.show();
// 		};
// 	};

// 	return new p5(sketch, parent);
// };
