import { writable } from 'svelte/store';

export const activeTabValue = writable(6);

export const isSidebarCollapsed = writable(true);
