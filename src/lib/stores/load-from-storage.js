import { browser } from '$app/environment';

function loadFromStorage(key, fallback) {
	if (!browser) return fallback;

	try {
		const raw = localStorage.getItem(key);
		if (raw) {
			const parsed = JSON.parse(raw);
			return parsed;
		}
	} catch (err) {
		console.error(`Failed to load ${key} from local storage`, err);
	}
	return fallback;
}

export { loadFromStorage };
