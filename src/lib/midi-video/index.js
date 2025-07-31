import { Piano, PixiPiano } from './classes/piano';

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
	// console.log(PIXI, parent);
	const app = new PIXI.Application();

	await app.init({
		canvas: canvas,
		width: 1280,
		height: 720,
		backgroundAlpha: 0.25,
		background: 0x000000
	});

	const piano = new PixiPiano(app, 0, 128, 0x550055, null);

	app.ticker.add((ticker) => {
		// piano.updateKey(index, channel, ) //something like this
	});
};
