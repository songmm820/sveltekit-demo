import { mount, unmount } from 'svelte';
import DialogInputEl from '$lib/components/dialog/DialogInputEl.svelte';

const DEFAULT_DURATION = 200;

let inputInstance: ReturnType<typeof mount> | null;

function destroyInput() {
	if (inputInstance) {
		// 等待动画完成
		unmount(inputInstance); // 卸载组件 会触发 onDestroy 钩子
		inputInstance = null;
	}
}

type InputOptions = {
	title?: string;
	placeholder?: string;
	message?: string;
	onConfirm?: (value: string) => void | Promise<void>;
	onCancel?: () => void | Promise<void>;
};

function input(options: InputOptions) {
	const { title = '温馨提示', message, placeholder, onConfirm, onCancel } = options;
	// 如果弹窗实例已存在，先销毁
	destroyInput();

	inputInstance = mount(DialogInputEl, {
		target: document.body,
		props: {
			open: true,
			duration: DEFAULT_DURATION,
			placeholder,
			message,
			title,
			onCancel: async () => {
				await Promise.resolve(onCancel?.()); // 支持异步操作
			},
			onConfirm: async (value: string) => {
				await Promise.resolve(onConfirm?.(value)); // 支持异步操作
			},
			onClose: () => {
				destroyInput();
			}
		}
	});
}

export default input;
