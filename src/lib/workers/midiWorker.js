import { Midi } from '@tonejs/midi';

self.onmessage = async (event) => {
	try {
		const file = event.data;
		const reader = new FileReader();

		reader.onload = () => {
			try {
				const arrayBuffer = reader.result;
				const midi = new Midi(new Uint8Array(arrayBuffer));

				self.postMessage({ success: true, result: midi.toJSON() });
			} catch (e) {
				self.postMessage({ success: false, error: e.message });
			}
		};

		reader.readAsArrayBuffer(file);
	} catch (e) {
		self.postMessage({ success: false, error: e.message });
	}
};
