const defaultSettingIDs = [{ id: 'default', desc: null }];
const defaultPianoFields = [
	{
		sID: 'default',
		piano: {
			pianoRimColor: '#C27803',
			pianoBlazeColor: '#C27803',
			numOfKeys: '88',
			startKey: '21',
			lastKey: '108'
		}
	}
];

const defaultNoteCanvas = [
	{
		sID: 'default',
		noteCanvas: {
			noteSizing: 'Tick Based',
			noteSpeed: '1',
			noteType: 'No Outline',
			keyFlare: {
				enabled: false,
				type: 'fire',
				intensity: 0
			},
			noteParticle: {
				enabled: false,
				turbulence: 0,
				particleDensity: 0,
				shootVelocity: 0
			}
		}
	}
];
const defaultColorScheme = [
	{
		sID: 'default',
		colorScheme: {
			colorBy: 'track',
			colorGeneration: 'random'
		}
	}
];
const defaultVideoFields = [
	{
		sID: 'default',
		video: {
			quality: '360p',
			fps: '30'
		}
	}
];

export {
	defaultSettingIDs,
	defaultPianoFields,
	defaultNoteCanvas,
	defaultColorScheme,
	defaultVideoFields
};
