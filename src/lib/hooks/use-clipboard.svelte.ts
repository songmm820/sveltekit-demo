type CopiedStatus = 'success' | 'failure';

type UseClipboardOptions = {
	delay: number;
	reset: boolean;
};

/**
 * 用于管理剪贴板的钩子
 */
export default class UseClipboard {
	// 复制状态
	#copiedStatus: CopiedStatus | undefined = $state(undefined);
	delay: number;
	reset: boolean;
	timeout: ReturnType<typeof setTimeout> | undefined = undefined;
	#lastCopied: string | undefined = $state(undefined);

	constructor({ delay = 1000, reset = true }: Partial<UseClipboardOptions>) {
		this.delay = delay;
		this.reset = reset;
	}

	static getInstance(options: Partial<UseClipboardOptions> = {}): UseClipboard {
		return new UseClipboard(options);
	}

	/**
	 * 复制文本到剪贴板
	 *
	 * @param _text 要复制的文本或数字
	 * @returns 复制状态
	 */
	async copy(_text: string | number): Promise<CopiedStatus> {
		const text = typeof _text === 'number' ? _text.toString() : _text;
		if (this.timeout) {
			this.#copiedStatus = undefined;
			clearTimeout(this.timeout);
		}

		try {
			await navigator.clipboard.writeText(text);
			this.#copiedStatus = 'success';
			this.#lastCopied = text;

			if (this.reset) {
				this.timeout = setTimeout(() => {
					this.#copiedStatus = undefined;
				}, this.delay);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('复制到剪贴板失败:', error);
			this.#copiedStatus = 'failure';
			if (this.reset) {
				this.timeout = setTimeout(() => {
					this.#copiedStatus = undefined;
				}, this.delay);
			}
		}

		return this.#copiedStatus;
	}

	/**
	 * 是否成功复制
	 *
	 * @returns 是否成功复制
	 */
	get copied(): boolean {
		return this.#copiedStatus === 'success';
	}

	/**
	 * 复制状态
	 *
	 * @returns 复制状态
	 */
	get status(): string | undefined {
		return this.#copiedStatus;
	}

	/**
	 * 上次复制的文本
	 *
	 * @returns 上次复制的文本
	 */
	get lastCopied(): string | undefined {
		return this.#lastCopied;
	}
}

export const useClipboard = UseClipboard.getInstance();
