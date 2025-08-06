import * as PIXI from 'pixi.js';
import * as PF from 'pixi-filters';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export class NoteCanvas {
	constructor(app, startKey, numOfKeys, offset, fallingSpeed, scheme) {
		this.app = app;
		this.stage = app.stage;

		this.offset = offset;
		this.gravity = fallingSpeed;
		this.graphics = {};
		this.scheme = scheme;

		this.startKey = startKey;
		this.numOfKeys = numOfKeys;
		this.lastKey = this.startKey + this.numOfKeys - 1;
		this.#updateDimensions();
		this.#initActiveNotes();

		this.noteSpeed = 10;

		this.container = new PIXI.Container();
		this.container.sortableChildren = true;
	}

	reset() {}

	startNote(midiKey, ticks, durationTicks, track) {
		if (midiKey < this.startKey || midiKey > this.lastKey) return;

		const xCoord = this.activeNotes[midiKey].x;

		const note = new PIXI.Sprite(PIXI.Texture.WHITE);
		note.x = xCoord;
		note.y = -durationTicks;
		note.zIndex = this.#checkType(midiKey);

		note.width = this.noteWidth;
		note.height = durationTicks;

		note.tint = this.#getColor(track);

		this.activeNotes[midiKey].notes.push(note);
		this.container.addChild(note);
		// this.stage.addChild(note);
		// console.log(this.activeNotes[midiKey].notes.length);
	}

	updatePositions() {
		for (const key of this.activeNotes) {
			for (const [i, note] of key.notes.entries()) {
				note.y += this.noteSpeed;
				if (note.y > this.d) {
					note.texture = PIXI.Texture.EMPTY;
					key.notes.splice(i, 1);
				}
			}
		}
	}

	checkExpired(currentTick) {}

	updateColorScheme(scheme) {
		this.scheme = scheme;
	}

	#getColor(track) {
		return this.scheme[track];
	}

	getContainer() {
		return this.container;
	}

	#initActiveNotes() {
		// activeNotes per key
		this.activeNotes = Array.from({ length: 128 }).map((_, i) => {
			const isBlack = this.#checkType(i);
			const whiteCount = this.#countWhite(i);
			const xCoord = isBlack
				? whiteCount * this.noteWidth - this.blackNoteWidth / 2
				: (whiteCount - 1) * this.noteWidth;

			return {
				notes: [],
				isBlack: isBlack,
				x: xCoord
			};
		});
	}

	#updateDimensions() {
		this.noteWidth = this.app.canvas.width / this.#countWhite(this.lastKey);
		this.blackNoteWidth = this.noteWidth * 0.5;
		this.keyboardHeight = this.app.canvas.height / 5;
		this.d = this.app.canvas.height - this.keyboardHeight;
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
}
