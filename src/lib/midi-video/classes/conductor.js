import * as PIXI from 'pixi.js';
import { get, writable } from 'svelte/store';
import { paused, midiData, isRecording } from '../../stores/midi-stores';
import { sessionSettings } from '../../stores/session-store';

export const currentTick = writable(0);
export const lastTick = writable(1);

export class Conductor {
	constructor(app, piano, noteCanvas) {
		this.app = app;
		this.stage = app.stage;

		// To be controlled by the conductor
		this.midiData = null;
		this.piano = piano;
		this.noteCanvas = noteCanvas;

		// Header
		this.headerName = '';
		this.meta = [];
		this.ppq = 0;
		this.tempoEvents = [];
		this.keySignatures = [];
		this.timeSignatures = [];
		this.lastTick = 0;

		// Tracks and notes
		this.tracks = [];
		this.#processNotes();
		this.currentNoteIndex = 0;
		this.advancedNoteIndex = 0;

		// Position in MIDI File
		this.currentTick = this.fallingNotesOffset * -1;
		this.fallingNotesOffset = this.app.canvas.height - this.piano.getKeyboardHeight();

		// Flags (and other user controlled values)
		this.isPaused = true;
		this.midiLoaded = false;

		// Tempo
		this.currentTempo = 0;
		this.currentTempoIndex = 0;
		this.tickDuration = 0;

		// Visuals
		this.container = new PIXI.Container();
		this.container.sortableChildren = true;
		this.#addContainersToStage();
		this.colorBy = get(sessionSettings).customize.colorScheme.colorBy;
	}

	reset() {
		this.midiData = null;

		this.ppq = 0;
		this.tempoEvents = null;

		this.currentTempoIndex = -1;
		this.tickDuration = 0;

		this.currentTick = this.fallingNotesOffset * -1;
		currentTick.set(0);
		this.currentNoteIndex = 0;
		this.advancedNoteIndex = 0;

		this.tracks = [];
		this.notes = [];

		this.piano.reset();
		this.noteCanvas.reset();
		paused.set(paused); // I explicitly set paused store here
	}

	updateMidiData() {
		this.reset();
		this.midiData = get(midiData);
		this.tempoEvents = this.midiData.header.tempos;
		this.ppq = this.midiData.header.ppq;
		this.tracks = this.midiData.tracks;
		this.#processNotes();
		this.#getLastTick();
		this.container = new PIXI.Container();
		this.container.sortableChildren = true;

		this.noteCanvas.setPpq(this.ppq);

		this.#addContainersToStage();
		this.colorBy = get(sessionSettings).customize.colorScheme.colorBy;
	}

	update(deltaTime) {
		if (this.isPaused || !this.midiData) return;

		this.updateTempo();
		this.updateNoteCanvas();
		this.updatePiano();
		this.#movePointer(deltaTime);

		if (this.currentTick >= this.lastTick) {
			this.updateMidiData();
			paused.set(true);

			if (get(isRecording)) {
				isRecording.set(false);
			}
		}
	}

	updateTempo() {
		/**
		 * n tempo is n beat per minute
		 * get the reciprocal: 1 min passes per n beats
		 * this means we get 60 seconds per n beats
		 * this further implies that 60000ms per n beats
		 *
		 * now, we get the ppq which is how many ticks in a beat
		 * to get the tick duration:
		 * first, get how many ms per beat: 60000/n
		 * then each beat should be divided by how many ticks are in a quarter note(beat)
		 * = 60000 / n / ppq
		 *
		 * i think i did the calculations correctly (pls let me know if i did it wrong, if ever anyone can see this)
		 */

		if (!this.tempoEvents || this.tempoEvents.length === 0) return;

		// Find latest tempo event BEFORE or AT currentTick
		for (let i = this.tempoEvents.length - 1; i >= 0; i--) {
			if (this.currentTick >= this.tempoEvents[i].ticks) {
				this.currentTempoIndex = i;
				this.currentTempo = this.tempoEvents[i].bpm;
				this.tickDuration = 60000 / this.currentTempo / this.ppq;
				return;
			}
		}

		// If none found, default to the first
		this.currentTempoIndex = 0;
		this.currentTempo = this.tempoEvents[0].bpm;
		this.tickDuration = 60000 / this.currentTempo / this.ppq;
	}

	updateNoteCanvas() {
		while (
			this.advancedNoteIndex < this.notes.length &&
			this.notes[this.advancedNoteIndex].ticks <= this.currentTick + this.fallingNotesOffset
		) {
			const { midi, durationTicks, track, ticks, channel } = this.notes[this.advancedNoteIndex];
			const offset = this.currentTick + this.fallingNotesOffset - ticks;
			const colorIndex = this.colorBy === 'tracks' ? track : channel;
			this.noteCanvas.startNote(midi, durationTicks, colorIndex, offset);
			this.advancedNoteIndex++;
		}

		if (!this.isPaused) {
			this.noteCanvas.updatePositions();
		}
	}

	updatePiano() {
		while (
			this.currentNoteIndex < this.notes.length &&
			this.notes[this.currentNoteIndex].ticks <= this.currentTick
		) {
			const { midi, durationTicks, track, ticks, channel } = this.notes[this.currentNoteIndex];
			const colorIndex = this.colorBy === 'tracks' ? track : channel;
			this.piano.playNote(midi, ticks, durationTicks, colorIndex);
			this.currentNoteIndex++;
		}
		this.piano.checkExpired(this.currentTick);
	}

	updateColorScheme(scheme) {
		this.piano.updateColorScheme(scheme);
		this.noteCanvas.updateColorScheme(scheme);
	}

	async seekLeft() {
		if (!this.midiData) return;
		const wasPaused = this.isPaused;

		if (!wasPaused) paused.set(true);
		await delay(100);
		this.#movePointer(-500);
		this.currentNoteIndex = 0;
		this.advancedNoteIndex = 0;
		this.currentTempoIndex = 0;

		this.updateTempo();

		this.noteCanvas.reset();
		this.updateNoteCanvas();

		this.piano.reset();
		this.updatePiano();
		if (!wasPaused) paused.set(false);
	}

	async seekRight() {
		if (!this.midiData) return;

		const wasPaused = this.isPaused;
		if (!wasPaused) paused.set(true);
		await delay(100);
		this.#movePointer(1000);
		// this.currentNoteIndex = 0;
		// this.advancedNoteIndex = 0;
		// this.currentTempoIndex = 0;

		this.updateTempo();

		this.noteCanvas.reset();
		this.updateNoteCanvas();

		this.piano.reset();
		this.updatePiano();
		if (!wasPaused) paused.set(false);
	}

	// called from outside (for formality)
	setPause(paused) {
		this.isPaused = paused;
	}

	#movePointer(deltaTime) {
		const deltaTicks = deltaTime / this.tickDuration;
		this.currentTick += deltaTicks;
		currentTick.set(this.currentTick);

		if (deltaTicks > 0) {
			this.noteCanvas.setNoteSpeed(deltaTicks);
		}
	}

	#processNotes() {
		// process all notes (flatten the tracks[n].notes arrays)
		let notes = [];
		if (this.tracks.length !== 0) {
			for (const [i, track] of this.tracks.entries()) {
				const trackNotes = track.notes.map((n) => {
					n.track = i;
					n.channel = track.channel;
					return n;
				});
				notes = notes.concat(trackNotes);
			}
			notes.sort((a, b) => a.ticks - b.ticks);
		}
		this.notes = notes;
	}

	#getLastTick() {
		const endPadding = this.ppq * 16;
		let max = 0;
		for (const t of this.tracks) {
			if (t.endOfTrackTicks > max) max = t.endOfTrackTicks;
		}

		this.lastTick = max + endPadding;
		lastTick.set(max) + endPadding;
	}

	#addContainersToStage() {
		this.container.addChild(this.noteCanvas.getContainer());
		this.container.addChild(this.piano.getContainer());
		this.container.sortChildren();
		this.stage.addChild(this.container);
	}
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
