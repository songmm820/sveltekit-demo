import confirm, { type ConfirmOptions } from './confirm';
import input, { type InputOptions } from './input';
import toast, { type ToastOptions } from './toast';

// 导出到一个对象上
const SvelteMessageBox = {
	confirm,
	input,
	toast
};

export default SvelteMessageBox;

export type { ConfirmOptions, InputOptions, ToastOptions };
