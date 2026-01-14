type Target = HTMLElement | Window | Document | null;

type ScrollBottomOptions = {
	// 触底阈值（px）：离底部小于该值即判定为触底，默认 0（完全到底）
	threshold: number;
	// 触底回调事件：滚动到底部时触发
	onReachBottom: () => void;
};

/**
 * 滚动到底部监听
 *
 * @param ref 目标元素或获取目标元素的函数
 * @param options 选项，包含触底阈值
 */
export default function useScrollBottom(
	ref: Target | (() => Target),
	_options?: ScrollBottomOptions
): void {
	let isBottom: boolean = $state(false);

	const { threshold = 0, onReachBottom } = _options ?? {};

	$effect(() => {
		const target = typeof ref === 'function' ? ref() : ref;
		if (!target) return;

		function onScrollBottom() {
			let scrollTop: number, scrollHeight: number, clientHeight: number;
			if (target === window || target === document) {
				scrollTop = window.scrollY || document.documentElement.scrollTop;
				scrollHeight = document.documentElement.scrollHeight;
				clientHeight = window.innerHeight || document.documentElement.clientHeight;
			} else if (target instanceof HTMLElement) {
				scrollTop = target.scrollTop;
				scrollHeight = target.scrollHeight;
				clientHeight = target.clientHeight;
			} else {
				isBottom = false;
				return;
			}
			isBottom = scrollTop + clientHeight >= scrollHeight - threshold;
			if (isBottom) {
				onReachBottom?.();
			}
		}

		onScrollBottom();
		const _handleScroll = () => onScrollBottom();
		target.addEventListener('scroll', _handleScroll);
		return () => target.removeEventListener('scroll', _handleScroll);
	});
}
