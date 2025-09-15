import { Soundfont2Sampler, CacheStorage } from 'smplr';
import { SoundFont2 } from 'soundfont2';
import MSGS from '../../assets/soundfont/msgs.sf2';

const ctx = new AudioContext();
const cacheStorage = new CacheStorage();
export const pianoSf = new Soundfont2Sampler(ctx, {
	url: MSGS,
	createSoundfont: (data) => new SoundFont2(data),
	decayTime: 0.5
});

pianoSf.load.then(() => {
	console.log(pianoSf);
	pianoSf.loadInstrument(pianoSf.instrumentNames[0]);
});
