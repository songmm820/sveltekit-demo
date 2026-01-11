import { SvelteSet } from 'svelte/reactivity';

/**
 * 用于管理z-index的钩子
 */
export default class UseZIndex {
	#zIndex = $state<number>(1000);
	#initialIndex: number;
	#history = $state<number[]>([]);
	#used = $state<SvelteSet<number>>(new SvelteSet());

	private static instance: UseZIndex | null = null;

	constructor(
		private _initialIndex: number = 1000,
		private _maxIndex: number = 9999
	) {
		this.#initialIndex = this._initialIndex;
		this.#zIndex = this._initialIndex;
	}

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
	 * 获取当前z-index值
	 *
	 * @returns 当前z-index值
	 */
	get current(): number {
		return this.#zIndex;
	}

	/**
	 * 获取z-index历史记录
	 *
	 * @returns z-index历史记录
	 */
	get history(): number[] {
		// 返回副本，防止外部修改
		return [...this.#history];
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
	getNext(_step: number = 1): number {
		const step = _step > 0 ? _step : 1;
		const nextIndex = this.#zIndex + step;
		if (nextIndex >= this._maxIndex) {
			return this._maxIndex;
		}
		this.#history.push(nextIndex);
		this.#used.add(nextIndex);
		this.#zIndex = nextIndex;
		return nextIndex;
	}

	/**
	 * 重置z-index值
	 */
	reset() {
		this.#zIndex = this.#initialIndex;
		this.#history = [];
	}

	/**
	 * 回收z-index值
	 *
	 * @param _zIndex 要回收的zIndex
	 */
	recycle(_zIndex: number) {
		if (this.#used.has(_zIndex)) {
			this.#used.delete(_zIndex);
			this.#history = this.#history.filter((index) => index !== _zIndex);
		}
		this.#zIndex = _zIndex - 1;
	}
}

export const useZIndex = UseZIndex.getInstance();
