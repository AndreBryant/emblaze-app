// Control this on midi-video/index.js
// This conductor controls the timing

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

	movePointer(deltaTime) {
		this.pointerTime += deltaTime;
	}

	changeMidiData(midiData) {
		this.midiData = midiData;
		this.tempoEvents = midiData.header.tempos;
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
