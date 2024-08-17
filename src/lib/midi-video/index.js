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
