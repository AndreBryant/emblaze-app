import * as PIXI from 'pixi.js';
import { PianoRim } from './pianoRim';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const WHITE_KEY_URL = '/sprites/white-key.png';
const BLACK_KEY_URL = '/sprites/black-key.png';
const WHITE_KEY_PRESSED_URL = '/sprites/white-key-pressed.png';
const BLACK_KEY_PRESSED_URL = '/sprites/black-key-pressed.png';

export class PixiPiano {
	keyboardState = [];
	noteTracks = [];
	scheme = [];
	wk = [];
	bk = [];
	graphics = {};

	activeNotes = [];

	BLACK = 0x010203;
	WHITE = 0xfefdfc;

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
			keyRim: new PianoRim(
				keyRimColor,
				this.whiteKeyHeight,
				this.app.canvas.height,
				this.app.canvas.width,
				this.startKey,
				this.lastKey
			),
			keyContainer: new PIXI.Container(),
			keys: []
		};

		this.graphics.keyContainer.sortableChildren = true;
	}

	reset() {
		this.activeNotes = Array.from({ length: 128 }).map((_, i) => ({
			notes: [],
			key: i
		}));

		for (const key of this.graphics.keys) {
			key.sprite.tint = this.#checkType(key.key) ? this.BLACK : this.WHITE;
		}

		this.graphics.keyRim.reset();
	}

	async initKeys() {
		let whiteTex, blackTex, whitePressedTex, blackPressedTex;
		await PIXI.Assets.load([
			WHITE_KEY_URL,
			BLACK_KEY_URL,
			WHITE_KEY_PRESSED_URL,
			BLACK_KEY_PRESSED_URL
		]).then(() => {
			whiteTex = PIXI.Texture.from(WHITE_KEY_URL);
			blackTex = PIXI.Texture.from(BLACK_KEY_URL);
			whitePressedTex = PIXI.Texture.from(WHITE_KEY_PRESSED_URL);
			blackPressedTex = PIXI.Texture.from(BLACK_KEY_PRESSED_URL);
		});

		this.graphics.keys = Array.from({ length: 128 }, (_, index) => {
			const midiKey = index;
			const isBlack = this.#checkType(midiKey);
			const whiteCount = this.#countWhite(midiKey);

			const texture = isBlack ? blackTex : whiteTex;
			const sprite = new PIXI.Sprite(texture);

			if (isBlack) {
				sprite.tint = this.BLACK;
				sprite.width = this.blackKeyWidth;
				sprite.height = this.blackKeyHeight;

				sprite.x = whiteCount * this.keyWidth - this.blackKeyWidth / 2;
				sprite.y = this.app.canvas.height - this.whiteKeyHeight;

				sprite.zIndex = 11;
			} else {
				sprite.tint = this.WHITE;
				sprite.width = this.keyWidth;
				sprite.height = this.whiteKeyHeight;

				sprite.x = (whiteCount - 1) * this.keyWidth;
				sprite.y = this.app.canvas.height - this.whiteKeyHeight;

				sprite.zIndex = 10;
			}

			return {
				key: midiKey,
				sprite: sprite,
				sprites: isBlack ? [blackTex, blackPressedTex] : [whiteTex, whitePressedTex]
			};
		});

		// this.#drawKeyRim();
		this.#addToContainer();
	}

	playNote(keyIndex, start, duration, track) {
		// play note if midikey is only within the range [startKey, lastKey]
		if (keyIndex > this.lastKey || keyIndex < this.startKey) return;

		const note = { start: start, duration: duration, track: track };
		this.activeNotes[keyIndex].notes.push(note);
		this.activeNotes[keyIndex].notes.sort((a, b) => b.track - a.track);

		this.#colorKey(
			keyIndex,
			this.#getColor(track) + (this.#checkType(keyIndex) ? -0x101010 : 0x0f0f0f),
			true
		);

		const rim = this.graphics.keyRim;
		// rim.startParticle(keyIndex, track);
	}

	checkExpired(currentTick) {
		const rim = this.graphics.keyRim;

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

					this.#colorKey(i, color, Boolean(keys.length));
					// rim.stopParticle(i, note.track);
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

	#colorKey(midiKey, color, isPlaying) {
		const key = this.graphics.keys[midiKey];
		key.sprite.tint = color;
		key.sprite.texture = !isPlaying ? key.sprites[0] : key.sprites[1];
	}

	#getColor(track) {
		return this.scheme[track];
	}

	#addToContainer() {
		const keys = this.graphics.keys;

		for (let i = this.startKey; i <= this.lastKey; i++) {
			const key = keys[i];
			this.graphics.keyContainer.addChild(key.sprite);
		}

		const pianoRim = this.graphics.keyRim.getContainer();
		this.graphics.keyContainer.addChild(pianoRim);

		this.graphics.keyContainer.sortChildren();
	}

	#countWhite(index) {
		let wkp = 0;
		for (let i = this.startKey; i <= index; i++) {
			wkp += Math.abs(this.#checkType(i) - 1);
		}
		return wkp;
	}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}

	#updateDimensions() {
		this.keyWidth = this.app.canvas.width / this.#countWhite(this.lastKey);
		this.blackKeyWidth = this.keyWidth * 0.6;
		this.whiteKeyHeight = this.app.canvas.height / 5;
		this.blackKeyHeight = this.whiteKeyHeight / 1.5;
	}
}
