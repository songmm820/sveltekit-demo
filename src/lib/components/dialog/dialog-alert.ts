import { mount, unmount } from 'svelte';
import DialogConfirmEl, {
	type DialogConfirmElProps
} from '$lib/components/dialog/DialogConfirmEl.svelte';
import DialogInputEl from '$lib/components/dialog/DialogInputEl.svelte';

const DEFAULT_DURATION = 200;

/* ******************************** 确认弹窗 ******************************** */

// 确认弹窗实例
let confirmInstance: ReturnType<typeof mount> | null;

/**
 * 销毁确认弹窗实例
 */
async function destroyConfirm() {
	if (confirmInstance) {
		// 等待动画完成
		unmount(confirmInstance); // 卸载组件 会触发 onDestroy 钩子
		confirmInstance = null;
	}
}

type ConfirmOptions = {
	title?: string;
	message?: string;
	type?: DialogConfirmElProps['type'];
	onConfirm?: () => void | Promise<void>;
	onCancel?: () => void | Promise<void>;
};

/**
 * 显示确认弹窗
 *
 * @param options 确认弹窗配置项
 */
function confirm(options: ConfirmOptions) {
	const {
		title = '温馨提示',
		type = 'primary',
		message = '确定要执行此操作吗？',
		onConfirm,
		onCancel
	} = options;
	// 如果弹窗实例已存在，先销毁
	destroyConfirm();

	confirmInstance = mount(DialogConfirmEl, {
		target: document.body,
		props: {
			open: true,
			duration: DEFAULT_DURATION,
			type,
			title,
			message,
			onCancel: async () => {
				await Promise.resolve(onCancel?.()); // 支持异步操作
			},
			onConfirm: async () => {
				await Promise.resolve(onConfirm?.()); // 支持异步操作
			},
			onClose: () => {
				destroyConfirm();
			}
		}
	});
}

/* ******************************** 输入弹窗 ******************************** */

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

// 导出到一个对象上
const SvelteMessageBox = {
	confirm,
	input
};

export default SvelteMessageBox;
