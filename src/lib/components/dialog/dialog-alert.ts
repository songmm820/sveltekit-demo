import { mount, unmount } from 'svelte';
import ConfirmEl, { type ConfirmElProps } from '$lib/components/dialog/ConfirmEl.svelte';

const DEFAULT_DURATION = 200;

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
	type?: ConfirmElProps['type'];
	onConfirm?: () => void | Promise<void>;
	onCancel?: () => void | Promise<void>;
};

/**
 * 显示确认弹窗
 *
 * @param options 确认弹窗配置项
 */
export function confirm(options: ConfirmOptions) {
	const {
		title = '提示',
		type = 'primary',
		message = '这是一个警告弹窗！',
		onConfirm,
		onCancel
	} = options;
	// 如果弹窗实例已存在，先销毁
	destroyConfirm();

	confirmInstance = mount(ConfirmEl, {
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
