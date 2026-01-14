import { SvelteSet } from 'svelte/reactivity';

/**
 * 用于管理z-index的钩子
 */
export default class UseZIndex {
	#used: SvelteSet<number> = $state(new SvelteSet());

	private static instance: UseZIndex | null = null;

	constructor(
		private _initialIndex: number = 1000,
		private _maxIndex: number = 9999
	) {}

	/**
	 * 获取单例实例（全局唯一的 z-index 管理器）
	 *
	 * @param options 初始化配置（仅首次创建生效）
	 * @returns UseZIndex 单例
	 */
	static getInstance(
		options: {
			initialIndex?: number;
			minIndex?: number;
			maxIndex?: number;
		} = {}
	): UseZIndex {
		if (!UseZIndex.instance) {
			UseZIndex.instance = new UseZIndex(options.initialIndex, options.maxIndex);
		}
		return UseZIndex.instance;
	}

	/**
	 * 获取已使用的z-index值集合
	 *
	 * @returns 已使用的z-index值集合
	 */
	get used(): Set<number> {
		// 返回副本，防止外部修改
		return new SvelteSet([...this.#used]);
	}

	/**
	 * 获取下一个z-index值
	 *
	 * @returns 下一个z-index值
	 */
	getNext(): number {
		if (this.#used.size === 0) {
			this.#used.add(this._initialIndex);
			return this._initialIndex;
		}

		// 获取#used中的最大值
		const maxUsed = Math.max(...this.#used);
		// 下一个z-index为最大值加1
		const nextIndex = maxUsed + 1;
		if (nextIndex >= this._maxIndex) {
			return this._maxIndex;
		}
		this.#used.add(nextIndex);
		return nextIndex;
	}

	/**
	 * 重置z-index值
	 */
	reset(): void {
		this.#used.clear();
	}

	/**
	 * 回收z-index值
	 *
	 * @param _zIndex 要回收的zIndex
	 */
	recycle(_zIndex: number): void {
		if (this.#used.has(_zIndex)) {
			this.#used.delete(_zIndex);
		}
	}
}

export const useZIndex = UseZIndex.getInstance();
