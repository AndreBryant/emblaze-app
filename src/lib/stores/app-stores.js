import { writable } from 'svelte/store';

export const activeTabValue = writable(1);

export const isSidebarCollapsed = writable(true);
