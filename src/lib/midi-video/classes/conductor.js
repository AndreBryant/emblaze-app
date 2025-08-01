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
	constructor(midiData, piano, startTick = 0, startOffset = 5) {
		// To be controlled by the conductor
		this.midiData = midiData | null;
		this.piano = piano;

		// Header
		this.headerName = midiData?.header.name;
		this.meta = midiData?.header.meta;
		this.ppq = midiData?.header.ppq | 0;
		this.tempoEvents = midiData?.header.tempos | [];
		this.keySignatures = midiData?.header.keySignatures | [];
		this.timeSignatures = midiData?.header.timeSignatures | [];

		// Tracks
		this.notes = [];

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
		// console.log(get(midiData));
	}

	reset() {
		this.midiData = null;

		this.ppq = 0;
		this.tempoEvents = null;

		this.currentTempoIndex = -1;
		this.tickDuration = 0;

		this.currentTick = 0;

		paused.set(paused); // I explicitly set paused store here
	}

	update(deltaTime) {
		if (this.isPaused) return;

		// Update Tempo
		if (
			this.currentTempoIndex < this.tempoEvents.length - 1 &&
			this.currentTick >= this.tempoEvents[this.currentTempoIndex + 1].ticks
		) {
			this.nextTempo();
		}

		// Update Notes

		this.movePointer(deltaTime);
	}

	movePointer(deltaTime) {
		const deltaTicks = deltaTime / this.tickDuration;
		this.currentTick += deltaTicks;
	}

	// called from outside (for formality)
	setPause(paused) {
		this.isPaused = paused;
	}

	nextTempo() {
		this.currentTempoIndex++;
		this.currentTempo = this.tempoEvents[this.currentTempoIndex].bpm;
		this.tickDuration = this.#getUsPerBeat(this.currentTempo) / 1000000 / this.ppq;
		// console.log(this.tickDuration);
	}

	// Private methods
	#getUsPerBeat(bpm) {
		return 60000000 / bpm;
	}
}
