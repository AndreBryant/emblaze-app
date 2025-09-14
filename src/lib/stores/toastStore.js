import { writable } from 'svelte/store';

/** @type {message: string, type: string}[] */
export const toasts = writable([]);

export function addToast(message, type, duration = 3000) {
	const toastId = Date.now();
	toasts.update((toasts) => [...toasts, { type, message, id: toastId, duration }]);
	// setTimeout(() => toasts.update((toasts) => toasts.slice(1)), duration);
}

export function removeToast(id) {
	toasts.update((toasts) => [...toasts.filter((t) => t.id != id)]);
}
