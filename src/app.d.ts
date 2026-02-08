// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { JwtPayload } from '$lib/server/common/token';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loginUser?: JwtPayload;
		}
		// interface PageData {}
		interface PageState {
			// Whether the page modal is open
			pageModalOpen: boolean;
		}
		// interface Platform {}
	}
}

export {};
