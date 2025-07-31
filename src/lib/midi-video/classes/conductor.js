// Control this on midi-video/index.js
// This conductor controls the timing

import { paused } from '../../stores/midi-stores';

export class Conductor {
	constructor(midiData, piano, startTime = 0, startOffset = 5) {
		this.midiData = midiData | null;
		this.piano = piano;
		this.startTime = startTime;
		this.startOffset = startOffset;

		this.tempoEvents = midiData?.header.tempos | null;
		this.pointerTime = startTime - startOffset;
		this.isPaused = true;
		this.midiLoaded = false;
	}

	reset() {
		this.midiData = null;
		this.tempoEvents = null;
		this.pointerTime = this.startTime - this.startOffset;
		paused.set(true);
	}

	movePointer(deltaTime) {
		this.pointerTime += deltaTime;
	}

	changeMidiData(midiData) {
		this.reset();
		this.midiData = midiData;
		this.tempoEvents = midiData.header.tempos;

		console.log('changed midi Data');
	}

	setPause(paused) {
		this.isPaused = paused;
		console.log(this.isPaused);
	}

	update(deltaTime) {
		if (this.isPaused) return;

		this.movePointer(deltaTime);
		console.log(this.pointerTime);
	}
}
