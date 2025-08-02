// Control this on midi-video/index.js
// This conductor controls the timing

/**
 * TODO:
 * 	1. Implement Updating Tempo depending on the current Tick
 *  2. Implement Playing notes on keyboard (go to PixiPiano to implement keyKeyDown and keyKeyReleased)
 *
 */

import { get } from 'svelte/store';
import { paused, midiData } from '../../stores/midi-stores';

export class Conductor {
	constructor(piano, startTick = 0, startOffset = 5) {
		// To be controlled by the conductor
		this.midiData = null;
		this.piano = piano;

		// Header
		this.headerName = '';
		this.meta = [];
		this.ppq = 0;
		this.tempoEvents = [];
		this.keySignatures = [];
		this.timeSignatures = [];

		// Tracks and notes
		this.tracks = [];
		this.#processNotes();
		this.currentNoteIndex = 0;

		// Position in MIDI File
		this.currentTick = 0;
		this.startTime = startTick;
		this.startOffset = startOffset;

		// Flags (and other user controlled values)
		this.isPaused = true;
		this.midiLoaded = false;

		// Tempo
		this.currentTempo = 0;
		this.currentTempoIndex = 0;
		this.tickDuration = 0;
	}

	updateMidiData() {
		this.reset();
		this.midiData = get(midiData);
		this.tempoEvents = this.midiData.header.tempos;
		this.ppq = this.midiData.header.ppq;
		this.tracks = this.midiData.tracks;
		this.#processNotes();

		console.log(this.notes);
		// console.log(get(midiData));
	}

	reset() {
		this.midiData = null;

		this.ppq = 0;
		this.tempoEvents = null;

		this.currentTempoIndex = -1;
		this.tickDuration = 0;

		this.currentTick = 0;

		this.tracks = [];
		this.notes = [];

		paused.set(paused); // I explicitly set paused store here
	}

	update(deltaTime) {
		if (this.isPaused || !this.midiData) return;

		this.updateTempo();
		this.updatePiano();
		this.#movePointer(deltaTime);
	}

	updatePiano() {
		while (
			this.currentNoteIndex < this.notes.length &&
			this.notes[this.currentNoteIndex].ticks <= this.currentTick
		) {
			const { midi, duration, track } = this.notes[this.currentNoteIndex];
			this.piano.keyKeyDown(midi, duration, track);
			this.currentNoteIndex++;
		}
	}

	updateTempo() {
		if (
			this.currentTempoIndex < this.tempoEvents.length - 1 &&
			this.currentTick >= this.tempoEvents[this.currentTempoIndex + 1].ticks
		) {
			this.currentTempoIndex++;
			this.currentTempo = this.tempoEvents[this.currentTempoIndex].bpm;
			this.tickDuration = 60000 / this.currentTempo / this.ppq;
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
			 */
		}
	}

	// called from outside (for formality)
	setPause(paused) {
		this.isPaused = paused;
	}

	#movePointer(deltaTime) {
		const deltaTicks = deltaTime / this.tickDuration;
		this.currentTick += deltaTicks;
		// console.log(this.currentTick, this.tickDuration, this.currentTempo);
	}

	#processNotes() {
		// process all notes (flatten the tracks[n].notes arrays)
		let notes = [];
		if (this.tracks.length !== 0) {
			for (const [i, track] of this.tracks.entries()) {
				const trackNotes = track.notes.map((n) => {
					n.track = i;
					return n;
				});
				notes = notes.concat(trackNotes);
			}
			notes.sort((a, b) => a.ticks - b.ticks);
		}
		this.notes = notes;
	}
}
