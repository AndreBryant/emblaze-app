import * as PIXI from 'pixi.js';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export class Piano {
	keyboardState = [];
	noteTracks = [];
	scheme = [];
	wk = [];
	bk = [];

	constructor(canvas, startKey, numOfKeys, keyRimColor = 75, scheme) {
		this.canvas = canvas;
		this.startKey = startKey;
		this.numOfKeys = numOfKeys;
		this.lastKey = this.startKey + this.numOfKeys - 1;
		this.keyRimColor = keyRimColor;
		this.scheme = scheme;
		for (let i = this.startKey; i <= this.lastKey; i++) {
			if (!this.#checkType(i)) {
				this.wk.push({
					i
				});
			} else {
				this.bk.push({
					i
				});
			}

			this.keyboardState.push({
				key: i,
				track: null,
				playing: false
			});
		}
		this.updateDimensions();
	}

	updateDimensions() {
		this.whiteKeyWidth = this.canvas.width / this.wk.length;
		this.blackKeyWidth = this.whiteKeyWidth;
		this.whiteKeyHeight = this.canvas.height / 5;
		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
	}

	show() {
		this.#drawKeyRim();
		this.#drawKeys(0);
		this.#drawKeys(1);
	}

	#drawKeys(type) {
		switch (type) {
			case 0:
				for (let i = 0; i < this.wk.length; i++) {
					this.#drawKey({ type: 0, key: this.wk[i].key }, i * this.whiteKeyWidth);
				}
				break;
			case 1:
				for (const k of this.bk) {
					const wkp = this.wk.filter((n) => n.i <= k.i).length;
					const startPos = wkp * this.blackKeyWidth - this.whiteKeyWidth / 4;
					this.#drawKey({ type: 1 }, startPos);
				}
				break;

			default:
				break;
		}
	}

	#drawKey({ type, key = null, wType = null }, startPos, channelColor = null) {
		const h = type ? this.blackKeyHeight : this.whiteKeyHeight;
		const w = this.whiteKeyWidth;

		this.canvas.strokeWeight(0.25);
		this.canvas.stroke(type ? 0 : 95);

		if (channelColor) {
			this.canvas.fill(channelColor);
			this.canvas.stroke(127);
			this.canvas.strokeWeight(1.5);
		} else {
			this.canvas.fill(type ? 0 : 255);
		}

		if (!type) {
			// handle keys and lowest keys
			if (key === this.startKey && ['left', 'inline'].includes(wType)) {
				if (wType === 'inline') wType = 'right';
				if (wType === 'left') wType = null;
			}

			if (key === this.lastKey && ['right', 'inline'].includes(wType)) {
				if (wType === 'inline') wType = 'left';
				if (wType === 'right') wType = null;
			}
			if (wType) {
				const d = this.whiteKeyWidth / 4;
				switch (wType) {
					case 'left':
						this.canvas.beginShape();
						this.canvas.vertex(
							startPos,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(
							startPos + d,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(startPos + d, this.canvas.height - this.whiteKeyHeight);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth,
							this.canvas.height - this.whiteKeyHeight
						);
						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
						this.canvas.vertex(startPos, this.canvas.height);
						this.canvas.endShape();
						break;
					case 'right':
						this.canvas.beginShape();
						this.canvas.vertex(startPos, this.canvas.height - this.whiteKeyHeight);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth - d,
							this.canvas.height - this.whiteKeyHeight
						);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth - d,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
						this.canvas.vertex(startPos, this.canvas.height);
						this.canvas.endShape();
						break;
					case 'inline':
						this.canvas.beginShape();
						this.canvas.vertex(startPos + d, this.canvas.height - this.whiteKeyHeight);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth - d,
							this.canvas.height - this.whiteKeyHeight
						);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth - d,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(
							startPos + this.whiteKeyWidth,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
						this.canvas.vertex(startPos, this.canvas.height);
						this.canvas.vertex(
							startPos,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.vertex(
							startPos + d,
							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
						);
						this.canvas.endShape();
						break;

					default:
						break;
				}
			} else {
				this.canvas.rect(startPos, this.canvas.height - this.whiteKeyHeight, w, h);
			}
		} else {
			this.canvas.rect(startPos, this.canvas.height - this.whiteKeyHeight - 2, w * 0.55, h + 2, 1);
		}
	}

	#drawKeyRim() {
		this.canvas.strokeWeight(2);
		this.canvas.stroke(75);
		this.canvas.line(
			0,
			this.canvas.height - this.whiteKeyHeight - 4,
			this.canvas.width,
			this.canvas.height - this.whiteKeyHeight - 4
		);
		this.canvas.strokeWeight(2);
		this.canvas.stroke(this.keyRimColor);
		this.canvas.line(
			0,
			this.canvas.height - this.whiteKeyHeight - 2,
			this.canvas.width,
			this.canvas.height - this.whiteKeyHeight - 2
		);
	}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}
}

export class PixiPiano {
	keyboardState = [];
	noteTracks = [];
	scheme = [];
	wk = [];
	bk = [];
	pianoGraphics = {};

	constructor(app, startKey, numOfKeys, keyRimColor = 75, scheme) {
		this.app = app;
		this.stage = app.stage;
		this.graphics = new PIXI.Graphics();

		this.startKey = startKey;
		this.numOfKeys = numOfKeys;
		this.lastKey = this.startKey + this.numOfKeys - 1;
		this.keyRimColor = keyRimColor;
		this.scheme = scheme;

		for (let i = this.startKey; i <= this.lastKey; i++) {
			if (!this.#checkType(i)) {
				this.wk.push({
					i
				});
			} else {
				this.bk.push({
					i
				});
			}

			this.keyboardState.push({
				key: i,
				track: null,
				playing: false
			});
		}

		this.pianoGraphics.keyRim = new PIXI.Graphics();

		this.pianoGraphics.blackKeys = Array.from(
			{ length: this.bk.length },
			() => new PIXI.Graphics()
		);

		this.pianoGraphics.whiteKeys = Array.from(
			{ length: this.wk.length },
			() => new PIXI.Graphics()
		);

		this.updateDimensions();
		this.#drawKeyRim();
		this.#drawKeys(0);
		this.#drawKeys(1);
	}

	updateDimensions() {
		this.whiteKeyWidth = this.app.canvas.width / this.wk.length;
		this.blackKeyWidth = this.whiteKeyWidth;
		this.whiteKeyHeight = this.app.canvas.height / 5;
		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
	}

	keyKeyDown(keyIndex, color = null) {
		// Check if black or white key
		const type = this.#checkType(keyIndex);

		// Get references to stored data according to key type (black or white)
		const keyIndices = type ? this.bk : this.wk;
		const graphicsArray = type ? this.pianoGraphics.blackKeys : this.pianoGraphics.whiteKeys;

		// Get index and the reference to the graphics object
		const i = keyIndices.findIndex((k) => k.i === keyIndex);
		const g = graphicsArray[i];

		// Determine what the color will be
		const c = !color ? (type ? 0x123123 : 0xaaaaaa) : color;

		g.clear();
		g.fill(c);
		// console.log(type, keyIndex, i, g, this.bk);
	}

	keyKeyRelease(keyIndex, color) {}

	show() {
		console.log('Showing piano');
		// this.#drawKeys(0);
	}

	#drawKeys(type) {
		switch (type) {
			case 0:
				for (let i = 0; i < this.wk.length; i++) {
					this.#drawKey(0, i * this.whiteKeyWidth, i);
				}
				break;
			case 1:
				for (const [i, k] of this.bk.entries()) {
					const wkp = this.wk.filter((n) => n.i <= k.i).length;
					const startPos = wkp * this.blackKeyWidth - this.whiteKeyWidth / 4;
					this.#drawKey(1, startPos, i);
				}
				break;

			default:
				break;
		}
	}

	#drawKey(type, startPos, index, channelColor = null) {
		// type 0 is white, type 1 is black
		const h = type ? this.blackKeyHeight : this.whiteKeyHeight;
		const w = this.whiteKeyWidth;

		let g;
		if (!type) {
			g = this.pianoGraphics.whiteKeys[index];
			g.rect(startPos, this.app.renderer.height - this.whiteKeyHeight, w, h);
			g.stroke({ width: 2, color: 0x000000 });
			g.fill(0xffffff);
		} else {
			g = this.pianoGraphics.blackKeys[index];
			g.rect(startPos, this.app.canvas.height - this.whiteKeyHeight - 2, w * 0.55, h + 2, 1);
			g.stroke({ width: 2, color: 0x123123 });
			g.fill(0x0);
		}
		this.stage.addChild(g);
	}

	#drawKeyRim() {
		const g = this.pianoGraphics.keyRim;
		const app = this.app;

		const y1 = app.renderer.height - this.whiteKeyHeight - 4;
		const y2 = app.renderer.height - this.whiteKeyHeight - 2;
		const width = app.renderer.width;

		// First line
		g.stroke({ width: 2, color: 0x4b4b4b });
		g.moveTo(0, y1);
		g.lineTo(width, y1);

		// Second line
		g.stroke({ width: 2, color: this.keyRimColor });
		g.moveTo(0, y2);
		g.lineTo(width, y2);

		this.stage.addChild(g);
	}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}
}
