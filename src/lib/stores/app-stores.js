import { writable } from 'svelte/store';

export const activeTabValue = writable(0);

export const isSidebarCollapsed = writable(false);
