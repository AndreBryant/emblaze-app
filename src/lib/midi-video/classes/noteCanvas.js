import * as PIXI from 'pixi.js';

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

		this.noteSpeed = 40;
		this.currentTempo = 0;
		this.ppq = 0;
		this.scale = 1;

		this.container = new PIXI.Container();
		this.container.sortableChildren = true;

		this.noteBaseTexture = null;
	}

	reset() {
		this.container.removeChildren();
		this.container.sortableChildren = true;

		this.#initActiveNotes();
	}

	async loadTexture() {
		const texture = '/sprites/note-texture.png';
		await PIXI.Assets.load([texture]).then(() => {
			this.noteBaseTexture = PIXI.Texture.from(texture);
		});
	}

	startNote(midiKey, durationTicks, colorIndex, offset) {
		if (midiKey < this.startKey || midiKey > this.lastKey) return;

		const note = new PIXI.NineSliceSprite(this.noteBaseTexture, 6, 6, 6, 6);
		note.x = this.activeNotes[midiKey].x;
		note.y = -durationTicks + offset;
		note.zIndex = this.#checkType(midiKey);

		note.width = this.noteWidth * (this.#checkType(midiKey) ? 0.5 : 1);
		note.height = durationTicks * this.scale;

		note.tint = this.#getColor(colorIndex) + (this.#checkType(midiKey) ? -0x101010 : 0);
		this.activeNotes[midiKey].notes.push(note);
		this.container.addChild(note);
	}

	updatePositions() {
		for (const key of this.activeNotes) {
			for (let i = key.notes.length - 1; i >= 0; i--) {
				const note = key.notes[i];
				note.y += this.noteSpeed;

				if (note.y > this.d) {
					this.container.removeChild(note);
					key.notes.splice(i, 1);
				}
			}
		}
	}

	updateColorScheme(scheme) {
		this.scheme = scheme;
	}

	updateTempo(tempo) {
		this.tempo = tempo;
		this.noteSpeed = (this.tempo * this.ppq) / 6000;
	}

	getContainer() {
		return this.container;
	}

	setNoteSpeed(deltaTicks) {
		this.noteSpeed = deltaTicks * this.scale;
	}

	setPpq(ppq) {
		this.ppq = ppq;
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

	#getColor(index) {
		return this.scheme[index];
	}
}
