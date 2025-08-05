import * as PIXI from 'pixi.js';
import * as PF from 'pixi-filters';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export class PixiPiano {
	keyboardState = [];
	noteTracks = [];
	scheme = [];
	wk = [];
	bk = [];
	pianoGraphics = {};

	activeNotes = [];

	BLACK = 0x000000;
	WHITE = 0xffffff;

	constructor(app, startKey, numOfKeys, keyRimColor = 0x550055, scheme) {
		this.app = app;
		this.stage = app.stage;
		this.graphics = new PIXI.Graphics();

		this.startKey = startKey;
		this.numOfKeys = numOfKeys;
		this.lastKey = this.startKey + this.numOfKeys - 1;
		this.keyRimColor = keyRimColor;
		this.scheme = scheme;
		this.#initializeColorScheme();
		this.#updateDimensions();

		this.activeNotes = Array.from({ length: 128 }).map((_, i) => ({
			notes: [],
			key: i
		}));

		this.pianoGraphics = {
			keyRim: new PIXI.Graphics(),
			keyContainer: new PIXI.Container(),
			keys: []
		};

		this.pianoGraphics.keyContainer.sortableChildren = true;

		this.stage.addChild(this.pianoGraphics.keyContainer);

		this.pianoGraphics.keys = Array.from({ length: 128 }, (_, index) => {
			const midiKey = index;
			const isBlack = this.#checkType(midiKey);
			const whiteCount = this.#countWhite(midiKey);
			const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

			if (isBlack) {
				// For Black Key
				sprite.tint = this.BLACK;
				sprite.width = this.blackKeyWidth;
				sprite.height = this.blackKeyHeight;

				sprite.x = whiteCount * this.keyWidth - this.blackKeyWidth / 2;
				sprite.y = this.app.canvas.height - this.whiteKeyHeight;

				sprite.zIndex = 1;
			} else {
				// For White Key
				sprite.tint = this.WHITE;
				sprite.width = this.keyWidth;
				sprite.height = this.whiteKeyHeight;

				sprite.x = (whiteCount - 1) * this.keyWidth;
				sprite.y = this.app.canvas.height - this.whiteKeyHeight;

				sprite.zIndex = 0;
			}

			const outline = new PF.OutlineFilter({ thickness: 1, color: 0x444444 });
			sprite.filters = [outline];
			return { key: midiKey, sprite: sprite };
		});

		this.#drawKeyRim();
		this.#drawKeys();
	}

	reset() {
		this.activeNotes = Array.from({ length: 128 }).map((_, i) => ({
			notes: [],
			key: i
		}));

		// reset Piano graphics.keys
		for (const key of this.pianoGraphics.keys) {
			key.sprite.tint = this.#checkType(key.key) ? this.BLACK : this.WHITE;
		}
	}

	#updateDimensions() {
		this.keyWidth = this.app.canvas.width / this.#countWhite(this.lastKey);
		this.blackKeyWidth = this.keyWidth * 0.5;
		this.whiteKeyHeight = this.app.canvas.height / 5;
		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
	}

	playNote(keyIndex, start, duration, track) {
		// play note if midikey is only within the range [startKey, lastKey]
		if (keyIndex > this.lastKey || keyIndex < this.startKey) return;

		const note = { start: start, duration: duration, track: track };
		this.activeNotes[keyIndex].notes.push(note);
		this.activeNotes[keyIndex].notes.sort((a, b) => b.track - a.track);

		this.#colorKey(keyIndex, this.#getColor(track));
	}

	checkExpired(currentTick) {
		for (let i = 0; i < this.activeNotes.length; i++) {
			if (i > this.lastKey || i < this.startKey) continue;

			const keys = this.activeNotes[i].notes;
			for (let j = 0; j < keys.length; j++) {
				const note = keys[j];

				if (note.start + note.duration <= currentTick) {
					keys.splice(j, 1);
					j--;

					const color = keys.length
						? this.#getColor(keys[0].track)
						: this.#checkType(i)
							? this.BLACK
							: this.WHITE;

					this.#colorKey(i, color);
				}
			}
		}
	}

	#colorKey(midiKey, color) {
		this.pianoGraphics.keys[midiKey].sprite.tint = color;
	}

	#getColor(track) {
		return this.colorScheme[track];
	}

	#randomColor() {
		// FOr nw return this but make sure PixiPiano has a color mapping maybe
		return Math.floor(Math.random() * 16777215);
	}

	#drawKeys() {
		const keys = this.pianoGraphics.keys;

		for (let i = this.startKey; i <= this.lastKey; i++) {
			const key = keys[i];
			this.pianoGraphics.keyContainer.addChild(key.sprite);
		}

		this.pianoGraphics.keyContainer.sortChildren();
	}

	#countWhite(index) {
		let wkp = 0;
		for (let i = this.startKey; i <= index; i++) {
			wkp += Math.abs(this.#checkType(i) - 1);
		}
		return wkp;
	}

	#drawKeyRim() {
		const g = this.pianoGraphics.keyRim;
		const app = this.app;

		const y1 = app.renderer.height - this.whiteKeyHeight - 4;
		const y2 = y1 + 2;
		const width = app.renderer.width;

		// First line
		g.moveTo(0, y1);
		g.lineTo(width, y1);
		g.stroke({ width: 2, color: 0x000000 });

		// Second line
		g.moveTo(0, y2);
		g.lineTo(width, y2);
		g.stroke({ width: 2, color: this.keyRimColor });

		this.stage.addChild(g);
	}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}

	#initializeColorScheme() {
		this.colorScheme = [];

		for (let i = 0; i < 128; i++) {
			this.colorScheme[i] = this.#randomColor();
		}
	}
}

/**
 * @deprecated This class is deprecated and will be removed in future versions.
 * Please use the `PixiPiano` instead for improved functionality.
 */
// export class Piano {
// 	keyboardState = [];
// 	noteTracks = [];
// 	scheme = [];
// 	wk = [];
// 	bk = [];

// 	constructor(canvas, startKey, numOfKeys, keyRimColor = 75, scheme) {
// 		this.canvas = canvas;
// 		this.startKey = startKey;
// 		this.numOfKeys = numOfKeys;
// 		this.lastKey = this.startKey + this.numOfKeys - 1;
// 		this.keyRimColor = keyRimColor;
// 		this.scheme = scheme;
// 		for (let i = this.startKey; i <= this.lastKey; i++) {
// 			if (!this.#checkType(i)) {
// 				this.wk.push({
// 					i
// 				});
// 			} else {
// 				this.bk.push({
// 					i
// 				});
// 			}

// 			this.keyboardState.push({
// 				key: i,
// 				track: null,
// 				playing: false
// 			});
// 		}
// 		this.updateDimensions();
// 	}

// 	updateDimensions() {
// 		this.whiteKeyWidth = this.canvas.width / this.wk.length;
// 		this.blackKeyWidth = this.whiteKeyWidth;
// 		this.whiteKeyHeight = this.canvas.height / 5;
// 		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
// 	}

// 	show() {
// 		this.#drawKeyRim();
// 		this.#drawKeys(0);
// 		this.#drawKeys(1);
// 	}

// 	#drawKeys(type) {
// 		switch (type) {
// 			case 0:
// 				for (let i = 0; i < this.wk.length; i++) {
// 					this.#drawKey({ type: 0, key: this.wk[i].key }, i * this.whiteKeyWidth);
// 				}
// 				break;
// 			case 1:
// 				for (const k of this.bk) {
// 					const wkp = this.wk.filter((n) => n.i <= k.i).length;
// 					const startPos = wkp * this.blackKeyWidth - this.whiteKeyWidth / 4;
// 					this.#drawKey({ type: 1 }, startPos);
// 				}
// 				break;

// 			default:
// 				break;
// 		}
// 	}

// 	#drawKey({ type, key = null, wType = null }, startPos, channelColor = null) {
// 		const h = type ? this.blackKeyHeight : this.whiteKeyHeight;
// 		const w = this.whiteKeyWidth;

// 		this.canvas.strokeWeight(0.25);
// 		this.canvas.stroke(type ? 0 : 95);

// 		if (channelColor) {
// 			this.canvas.fill(channelColor);
// 			this.canvas.stroke(127);
// 			this.canvas.strokeWeight(1.5);
// 		} else {
// 			this.canvas.fill(type ? 0 : 255);
// 		}

// 		if (!type) {
// 			// handle keys and lowest keys
// 			if (key === this.startKey && ['left', 'inline'].includes(wType)) {
// 				if (wType === 'inline') wType = 'right';
// 				if (wType === 'left') wType = null;
// 			}

// 			if (key === this.lastKey && ['right', 'inline'].includes(wType)) {
// 				if (wType === 'inline') wType = 'left';
// 				if (wType === 'right') wType = null;
// 			}
// 			if (wType) {
// 				const d = this.whiteKeyWidth / 4;
// 				switch (wType) {
// 					case 'left':
// 						this.canvas.beginShape();
// 						this.canvas.vertex(
// 							startPos,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + d,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(startPos + d, this.canvas.height - this.whiteKeyHeight);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth,
// 							this.canvas.height - this.whiteKeyHeight
// 						);
// 						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
// 						this.canvas.vertex(startPos, this.canvas.height);
// 						this.canvas.endShape();
// 						break;
// 					case 'right':
// 						this.canvas.beginShape();
// 						this.canvas.vertex(startPos, this.canvas.height - this.whiteKeyHeight);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth - d,
// 							this.canvas.height - this.whiteKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth - d,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
// 						this.canvas.vertex(startPos, this.canvas.height);
// 						this.canvas.endShape();
// 						break;
// 					case 'inline':
// 						this.canvas.beginShape();
// 						this.canvas.vertex(startPos + d, this.canvas.height - this.whiteKeyHeight);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth - d,
// 							this.canvas.height - this.whiteKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth - d,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + this.whiteKeyWidth,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(startPos + this.whiteKeyWidth, this.canvas.height);
// 						this.canvas.vertex(startPos, this.canvas.height);
// 						this.canvas.vertex(
// 							startPos,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.vertex(
// 							startPos + d,
// 							this.canvas.height - this.whiteKeyHeight + this.blackKeyHeight
// 						);
// 						this.canvas.endShape();
// 						break;

// 					default:
// 						break;
// 				}
// 			} else {
// 				this.canvas.rect(startPos, this.canvas.height - this.whiteKeyHeight, w, h);
// 			}
// 		} else {
// 			this.canvas.rect(startPos, this.canvas.height - this.whiteKeyHeight - 2, w * 0.55, h + 2, 1);
// 		}
// 	}

// 	#drawKeyRim() {
// 		this.canvas.strokeWeight(2);
// 		this.canvas.stroke(75);
// 		this.canvas.line(
// 			0,
// 			this.canvas.height - this.whiteKeyHeight - 4,
// 			this.canvas.width,
// 			this.canvas.height - this.whiteKeyHeight - 4
// 		);
// 		this.canvas.strokeWeight(2);
// 		this.canvas.stroke(this.keyRimColor);
// 		this.canvas.line(
// 			0,
// 			this.canvas.height - this.whiteKeyHeight - 2,
// 			this.canvas.width,
// 			this.canvas.height - this.whiteKeyHeight - 2
// 		);
// 	}

// 	#checkType(keyIndex) {
// 		return MOD_KEY_MAPPING[keyIndex % 12];
// 	}
// }
