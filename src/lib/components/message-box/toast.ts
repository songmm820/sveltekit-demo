import { mount, unmount } from 'svelte';
import ToastEl, { type ToastElProps } from '$lib/components/toast/ToastEl.svelte';
import { nanoid } from 'nanoid';

const DEFAULT_DURATION = 4000;

type ToastInstance = {
	id: string;
	instance: ToastEl;
};

// 土司实例集合
const toastInstances: ToastInstance[] = [];
// 每个土司间距
const TOAST_GAP: number = 55;
// 同时显示的最大toast数量
const MAX_TOAST_COUNT: number = 3;

/**
 * 销毁确认弹窗实例
 *
 * @param id 土司实例ID
 */
async function destroyToast(id: string) {
	const targetIndex = toastInstances.findIndex((item) => item.id === id);
	if (targetIndex === -1) return;
	const targetItem = toastInstances[targetIndex];
	if (targetItem) {
		// 从集合中移除
		toastInstances.splice(targetIndex, 1);
		unmount(targetItem.instance);
		updateToastOffsets();
	}
}

/**
 * 更新所有toast的垂直偏移，保证排版连续
 */
function updateToastOffsets() {
	toastInstances.forEach((item, index) => {
		// 更新索引，索引减11
		item.instance.onUpdateIndex(index);
	});
}

export type ToastOptions = Omit<ToastElProps, 'open' | 'onClose'> & {
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

	// 如果超出最大toast数量，移除最早的toast
	if (toastInstances.length >= MAX_TOAST_COUNT) {
		return;
	}

	const toastId = nanoid(8);
	const offsetY = toastInstances.length * TOAST_GAP;

	const newToastInstance = mount(ToastEl, {
		target: document.body,
		props: {
			open: true,
			status,
			rounded,
			position,
			offsetY,
			duration,
			gap: TOAST_GAP,
			message,
			description,
			onClose: () => {
				destroyToast(toastId);
			}
		}
	});

	// 添加到实例集合
	toastInstances.push({ id: toastId, instance: newToastInstance });
	// 更新所有toast的垂直偏移
	updateToastOffsets();
}

export default toast;
