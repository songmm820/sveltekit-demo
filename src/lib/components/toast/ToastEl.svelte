<!-- 
 @component 
 - 土司提示组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - duration: number 弹窗显示时间，单位毫秒
	 - status: 'success' | 'error' | 'info' | 'warning' 弹窗状态
	 - position: 'top' | 'bottom' | 'center' 弹窗位置
	 - rounded: boolean 是否圆角
	 - message: string 弹窗消息
	 - description?: string 弹窗描述
	 - onClose?: () => void 弹窗关闭回调
-->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { translateY } from '$lib/utils/animation';
	import { cva } from 'class-variance-authority';
	import { linear } from 'svelte/easing';

	// 过渡动画时间，单位毫秒
	const DEFAULT_DURATION: number = 200;

	export type ToastElProps = {
		duration?: number; // 弹窗显示时间，单位毫秒
		status?: 'success' | 'error' | 'info' | 'warning';
		position?: 'top' | 'bottom' | 'center';
		rounded?: boolean;
		open: boolean;
		message: string;
		description?: string;
		onClose?: () => void;
	};

	const id = $props.id();
	const zIndex = useZIndex.getNext();

	let {
		open = $bindable(false),
		status = 'info',
		position = 'top',
		duration = 2000,
		rounded = false,
		description,
		message,
		onClose
	}: ToastElProps = $props();

	const toastVariant = cva('my-toast', {
		variants: {
			position: {
				top: 'top-16 left-1/2 transform -translate-x-1/2',
				bottom: 'bottom-16 left-1/2 transform -translate-x-1/2',
				center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
			},
			rounded: {
				true: 'rounded-full',
				false: 'rounded-lg'
			}
		},
		defaultVariants: {
			position: 'top'
		}
	});

	async function onCloseToast() {
		await new Promise((resolve) => setTimeout(resolve, duration));
		open = false;
		await new Promise((resolve) => setTimeout(resolve, DEFAULT_DURATION));
		onClose?.();
	}

	$effect(() => {
		if (open) {
			// 打开时，等待 duration 毫秒后关闭
			onCloseToast();
		}
	});

	onDestroy(() => {
		useZIndex.recycle(zIndex);
	});
</script>

{#if open}
	<div
		transition:translateY|global={{ duration: DEFAULT_DURATION, offset: 40, easing: linear }}
		class={toastVariant({ position, rounded })}
		{id}
		style:z-index={zIndex}
	>
		{message}

		{#if description}
			<div class="mt-1 text-sm opacity-60">
				{description}
			</div>
		{/if}
	</div>
{/if}

<style lang="css">
	@reference '#app.css';

	.my-toast {
		@apply fixed px-5 py-2 bg-(--toast) text-center text-md shadow-xl;
	}
</style>
