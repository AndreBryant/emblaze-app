import * as PIXI from 'pixi.js';
import * as PF from 'pixi-filters';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export class PixiPiano {
	keyboardState = [];
	noteTracks = [];
	scheme = [];
	wk = [];
	bk = [];
	graphics = {};

	activeNotes = [];

	BLACK = 0x000000;
	WHITE = 0xffffff;

	constructor(app, startKey, numOfKeys, keyRimColor = 0x550055, scheme) {
		this.app = app;
		this.stage = app.stage;

		this.startKey = startKey;
		this.numOfKeys = numOfKeys;
		this.lastKey = this.startKey + this.numOfKeys - 1;
		this.keyRimColor = keyRimColor;
		this.scheme = scheme;
		this.#updateDimensions();

		this.activeNotes = Array.from({ length: 128 }).map((_, i) => ({
			notes: [],
			key: i
		}));

		this.graphics = {
			keyRim: new PIXI.Graphics(),
			keyContainer: new PIXI.Container(),
			keys: []
		};

		this.graphics.keyContainer.sortableChildren = true;

		this.graphics.keys = Array.from({ length: 128 }, (_, index) => {
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

				sprite.zIndex = 11;
			} else {
				// For White Key
				sprite.tint = this.WHITE;
				sprite.width = this.keyWidth;
				sprite.height = this.whiteKeyHeight;

				sprite.x = (whiteCount - 1) * this.keyWidth;
				sprite.y = this.app.canvas.height - this.whiteKeyHeight;

				sprite.zIndex = 10;
			}

			const outline = new PF.OutlineFilter({ thickness: 1, color: 0x444444 });
			sprite.filters = [outline];
			return { key: midiKey, sprite: sprite };
		});

		this.#drawKeyRim();
		this.#addKeysToContainer();
	}

	reset() {
		this.activeNotes = Array.from({ length: 128 }).map((_, i) => ({
			notes: [],
			key: i
		}));

		// reset Piano graphics.keys
		for (const key of this.graphics.keys) {
			key.sprite.tint = this.#checkType(key.key) ? this.BLACK : this.WHITE;
		}
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

	getKeyboardHeight() {
		return this.whiteKeyHeight;
	}

	updateColorScheme(scheme) {
		this.scheme = scheme;
	}

	getContainer() {
		return this.graphics.keyContainer;
	}

	#colorKey(midiKey, color) {
		this.graphics.keys[midiKey].sprite.tint = color;
	}

	#getColor(track) {
		return this.scheme[track];
	}

	#addKeysToContainer() {
		const keys = this.graphics.keys;

		for (let i = this.startKey; i <= this.lastKey; i++) {
			const key = keys[i];
			this.graphics.keyContainer.addChild(key.sprite);
		}

		this.graphics.keyContainer.sortChildren();
	}

	#countWhite(index) {
		let wkp = 0;
		for (let i = this.startKey; i <= index; i++) {
			wkp += Math.abs(this.#checkType(i) - 1);
		}
		return wkp;
	}

	#drawKeyRim() {
		const g = this.graphics.keyRim;
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

	#updateDimensions() {
		this.keyWidth = this.app.canvas.width / this.#countWhite(this.lastKey);
		this.blackKeyWidth = this.keyWidth * 0.5;
		this.whiteKeyHeight = this.app.canvas.height / 5;
		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
	}
}
