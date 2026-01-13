import { mount, unmount } from 'svelte';
import DialogConfirmEl, {
	type DialogConfirmElProps
} from '$lib/components/dialog/DialogConfirmEl.svelte';

const DEFAULT_DURATION = 200;

// 确认弹窗实例
let confirmInstance: DialogConfirmEl | null;

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

export type ConfirmOptions = Omit<DialogConfirmElProps, 'open' | 'onClose'> & {
	open?: boolean;
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
		cancelText,
		confirmText,
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
			cancelText,
			confirmText,
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

export default confirm;
