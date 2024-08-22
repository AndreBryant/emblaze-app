import * as tm from '@tonejs/midi';

export const processFile = async (file) => {
	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onload = async (event) => {
			try {
				const arrayBuffer = event.target.result;

				const midiData = new Uint8Array(arrayBuffer);

				const midi = new tm.Midi(midiData);
				resolve(midi);
			} catch (error) {
				reject(error);
			}
			reader.onerror = (error) => {
				reject(error);
			};
		};
		reader.readAsArrayBuffer(file);
	});
};

import * as cStores from './stores/customize-stores.js';

export const loadConfigurations = () => {
	// console.log(cStores);
};
