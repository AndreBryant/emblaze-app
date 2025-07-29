import { Piano } from './classes/piano';

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

export const createPixiSketch = async (PIXI, parent) => {
	// console.log(PIXI, parent);
	const app = new PIXI.Application();

	await app.init({
		width: 1280,
		height: 720
	});

	// Cnavas  Setup
	const canvas = app.canvas;
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	canvas.style.display = 'block';
	canvas.style.maxWidth = '100%';

	parent.appendChild(app.canvas);

	// Draw Piano
	// const piano = new Piano(PIXI, 0, 128, [85, 0, 85], null);
};
