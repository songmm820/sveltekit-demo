import { MediaQuery } from 'svelte/reactivity';

const DEFAULT_MOBILE_BREAKPOINT: number = 768;

export class IsMobile extends MediaQuery {
	constructor(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
		super(`(max-width: ${breakpoint - 1}px)`);
	}
}

const DEFAULT_DESKTOP_BREAKPOINT: number = 1024;

export class IsDesktop extends MediaQuery {
	constructor(breakpoint: number = DEFAULT_DESKTOP_BREAKPOINT) {
		super(`(max-width: ${breakpoint}px)`);
	}
}
