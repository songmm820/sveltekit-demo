import { mount, unmount } from 'svelte';
import DialogInputEl from '$lib/components/dialog/DialogInputEl.svelte';
import type { InputProps } from '$lib/components/input/Input.svelte';

const DEFAULT_DURATION = 200;

let inputInstance: DialogInputEl | null;

function destroyInput() {
	if (inputInstance) {
		// 等待动画完成
		unmount(inputInstance); // 卸载组件 会触发 onDestroy 钩子
		inputInstance = null;
	}
}

export type InputOptions = Pick<
	InputProps,
	'value' | 'title' | 'placeholder' | 'maxLength' | 'clear'
> & {
	message?: string;
	onConfirm?: (value: string) => void | Promise<void>;
	onCancel?: () => void | Promise<void>;
};

/**
 * 输入弹窗
 *
 * onConfirm 确认回调函数，内部reject错误时，onConfirm 不会自动关闭弹窗
 *
 * @param options - 弹窗配置项
 * @returns 弹窗实例
 */
function input(options: InputOptions) {
	const {
		value = '',
		title = '温馨提示',
		message,
		placeholder,
		maxLength,
		clear = true,
		onConfirm,
		onCancel
	} = options;
	// 如果弹窗实例已存在，先销毁
	destroyInput();

	inputInstance = mount(DialogInputEl, {
		target: document.body,
		props: {
			open: true,
			duration: DEFAULT_DURATION,
			placeholder: placeholder || '',
			value,
			maxLength,
			clear,
			message,
			title: title || '',
			onCancel: async () => {
				await Promise.resolve(onCancel?.()); // 支持异步操作
			},
			onConfirm: async (value: string) => {
				try {
					await Promise.resolve(onConfirm?.(value)); // 支持异步操作
					inputInstance?.close();
				} catch (error) {
					// 如果有reject错误，则不关闭弹窗
					return Promise.reject(error);
				}
			},
			onClose: () => {
				destroyInput();
			}
		}
	});
}

export default input;
