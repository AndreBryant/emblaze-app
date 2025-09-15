import { Soundfont2Sampler, CacheStorage } from 'smplr';
import { SoundFont2 } from 'soundfont2';
import MSGS from '../../assets/soundfont/msgs.sf2';

const ctx = new AudioContext();
const compressor = ctx.createDynamicsCompressor();
compressor.threshold.value = -36;
compressor.ratio.value = 18;
compressor.attack.value = 0.003;
compressor.release.value = 0.25;
compressor.knee.value = 30;
compressor.connect(ctx.destination);

const cache = new CacheStorage();

export const pianoSf = new Soundfont2Sampler(ctx, {
	url: MSGS,
	createSoundfont: (data) => new SoundFont2(data),
	decayTime: 0.3,
	destination: compressor,
	storage: cache
});

pianoSf.load.then(() => {
	console.log(pianoSf);
	pianoSf.loadInstrument(pianoSf.instrumentNames[0]);
});
