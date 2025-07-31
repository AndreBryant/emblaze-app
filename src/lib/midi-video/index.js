import { get } from 'svelte/store';
import { Piano, PixiPiano } from './classes/piano';
import { Conductor } from './classes/conductor';

import { midiData, filename, midiLoaded, paused } from '../stores/midi-stores';

export const createSketch = (p5, parent) => {
	const sketch = (p) => {
		p.piano;

		p.setup = () => {
			p.createCanvas(1280, 720);
			p.piano = new Piano(p, 0, 128, [85, 0, 85], null);
			p.canvas.style.height = '100%';
			p.canvas.style.width = '100%';
		};

		p.draw = () => {
			p.piano.show();
		};
	};

	return new p5(sketch, parent);
};

export const createPixiSketch = async (PIXI, canvas) => {
	const app = new PIXI.Application();

	await app.init({
		canvas: canvas,
		width: 1280,
		height: 720,
		backgroundAlpha: 0.5,
		background: 0x111111,
		preferWebGL: true
	});

	const piano = new PixiPiano(app, 0, 128, 0x550055, null);
	const conductor = new Conductor(get(midiData), piano);

	paused.subscribe(() => {
		conductor.setPause(get(paused));
	});

	midiData.subscribe(() => {
		if (!get(midiData)) {
			conductor.reset();
			return;
		}
		conductor.changeMidiData(get(midiData));
	});

	app.ticker.add((ticker) => {
		if (!get(midiLoaded)) return;
		conductor.update(ticker.deltaTime);
	});
};
