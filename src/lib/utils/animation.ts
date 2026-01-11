import { backInOut } from 'svelte/easing';

type AnimationParams = {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
};

/**
 * 缩放动画
 *
 * @param node 弹窗元素
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function scale(node: HTMLElement, params?: AnimationParams) {
	const { duration, easing, delay } = params || {
		duration: 400,
		easing: backInOut,
		delay: 0
	};
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
 * @param params 动画配置
 * @returns 动画配置对象
 */
export function translateY(node: HTMLElement, params?: AnimationParams & { offset?: number }) {
	const {
		duration,
		easing,
		delay,
		offset = 70
	} = params || {
		duration: 400,
		easing: backInOut,
		delay: 0
	};
	const existingTransform = getComputedStyle(node).transform.replace('none', '');
	const opacity = getComputedStyle(node).opacity;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) => {
			const translateY = (1 - t) * offset;
			const opacityValue = t * parseFloat(opacity);
			return `transform: ${existingTransform} translateY(${-translateY}px); opacity: ${opacityValue};`;
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
	const { duration, easing, delay } = params || {
		duration: 400,
		easing: backInOut,
		delay: 0
	};
	const opacity = getComputedStyle(node).opacity;

	return {
		delay: delay,
		duration: duration,
		easing: easing,
		css: (t: number) => `opacity: ${t * parseFloat(opacity)};`
	};
}
