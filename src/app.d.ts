// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			// Whether the page modal is open
			pageModalOpen: boolean;
		}
		// interface Platform {}
	}
}

export {};
