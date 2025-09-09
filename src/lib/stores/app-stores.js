import { writable } from 'svelte/store';

export const activeTabValue = writable(5);

export const isSidebarCollapsed = writable(true);
