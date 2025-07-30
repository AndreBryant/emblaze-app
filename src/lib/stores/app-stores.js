import { writable } from 'svelte/store';

export const activeTabValue = writable(4);

export const isSidebarCollapsed = writable(true);
