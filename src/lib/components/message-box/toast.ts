import { mount, unmount } from 'svelte';
import ToastEl, { type ToastElProps } from '$lib/components/toast/ToastEl.svelte';

const DEFAULT_DURATION = 4000;

// 确认实例集合
let toastInstance: ToastEl | null;
// const toastInstances: ReturnType<typeof mount>[] = [];

/**
 * 销毁确认弹窗实例
 */
async function destroyToast() {
	if (toastInstance) {
		// 等待动画完成
		unmount(toastInstance); // 卸载组件 会触发 onDestroy 钩子
		toastInstance = null;
	}
}

type ToastOptions = Omit<ToastElProps, 'open' | 'onClose'> & {
	message: string;
};

/**
 * 显示确认弹窗
 *
 * @param options 确认弹窗配置项
 */
function toast(options: ToastOptions) {
	const {
		message,
		duration = DEFAULT_DURATION,
		position = 'top',
		description,
		status,
		rounded
	} = options;
	// 如果弹窗实例已存在，直接返回
	if (toastInstance) {
		return;
	}

	toastInstance = mount(ToastEl, {
		target: document.body,
		props: {
			open: true,
			status,
			rounded,
			position,
			duration,
			message,
			description,
			onClose: () => {
				destroyToast();
			}
		}
	});
}

export default toast;
