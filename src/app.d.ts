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

	interface Window {
		electronAPI: {
			// 关闭应用
			onCloseApp: () => void;
			// Electron 版本
			version: string;
			// Electron 版本
			electronVersion: string;
			// 执行命令
			executeCommand: (cmd: string) => Promise<string>;
		};
	}
}

export {};
