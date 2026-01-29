import { backInOut, linear } from 'svelte/easing';

type AnimationParams = {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	reverse?: boolean;
};

/**
 * 缩放动画
 *
 * @param node 弹窗元素
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function scale(node: HTMLElement, params?: AnimationParams) {
	const { duration = 400, easing = backInOut, delay = 0 } = params || {};
	const existingTransform = getComputedStyle(node).transform.replace('none', '');
	const opacity = getComputedStyle(node).opacity;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) =>
			`transform: ${existingTransform} scale(${t}) ; opacity: ${t * parseFloat(opacity)};`
	};
}

/**
 * Y轴平移动画
 *
 * @param node 弹窗元素
 * @param reverse 是否反向动画
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function translateY(
	node: HTMLElement,
	params?: AnimationParams & { offset?: number; full?: boolean }
) {
	const {
		duration = 400,
		easing = linear,
		delay = 0,
		offset = 70,
		reverse = false,
		full = false
	} = params || {};
	const existingTransform = getComputedStyle(node).transform.replace('none', '');
	const opacity = getComputedStyle(node).opacity;
	const fullOffset = full ? node.offsetHeight : offset;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) => {
			const translateYValue = reverse ? (1 - t) * fullOffset * -1 : (1 - t) * fullOffset;

			const opacityValue = t * parseFloat(opacity);
			return `transform: ${existingTransform} translateY(${-translateYValue}px); opacity: ${opacityValue};`;
		}
	};
}

/**
 * X轴平移动画
 *
 * @param node 弹窗元素
 * @param reverse 是否反向动画
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function translateX(
	node: HTMLElement,
	params?: AnimationParams & { offset?: number; full?: boolean }
) {
	const {
		duration = 400,
		easing = linear,
		delay = 0,
		offset = 70,
		reverse = false,
		full = false
	} = params || {};
	const existingTransform = getComputedStyle(node).transform.replace('none', '');
	const opacity = getComputedStyle(node).opacity;
	const fullOffset = full ? node.offsetWidth : offset;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) => {
			const translateYValue = reverse ? (1 - t) * fullOffset * -1 : (1 - t) * fullOffset;
			const opacityValue = t * parseFloat(opacity);
			return `transform: ${existingTransform} translateX(${translateYValue}px); opacity: ${opacityValue};`;
		}
	};
}

/**
 * 渐变动画
 *
 * @param node 弹窗元素
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function fade(node: HTMLElement, params?: AnimationParams) {
	const { duration = 400, easing = backInOut, delay = 0 } = params || {};
	const opacity = getComputedStyle(node).opacity;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) => `opacity: ${t * parseFloat(opacity)};`
	};
}
