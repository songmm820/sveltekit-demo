<!-- 
 @component
 - 弹窗遮罩组件
 - 自定义属性
	 - zIndex: number 弹窗遮罩的 z-index 值
	 - duration?: number 弹窗遮罩动画持续时间
	 - children?: Snippet 遮罩子元素
	 - onClose: () => void 点击遮罩时触发的回调函数
-->

<script lang="ts">
	import { fade } from '$lib/utils/animation';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	export type OverlayProps = {
		zIndex: number;
		duration?: number;
		children?: Snippet;
		onClick?: () => void;
	};

	const id = $props.id();

	let { zIndex, duration = 300, children, onClick }: OverlayProps = $props();

	// 弹窗遮罩组件的动作函数, 用于禁止滚动body
	const overlayAction: Attachment<HTMLElement> = (element: HTMLElement) => {
		const originalOverflow = element.style.overflow;
		element.style.overflow = 'hidden';
		return () => {
			element.style.overflow = originalOverflow;
		};
	};

	// 点击遮罩关闭弹窗
	function handleClick() {
		onClick?.();
	}
</script>

<!-- 禁止滚动body -->
<svelte:body {@attach overlayAction} />

<div
	aria-hidden="true"
	transition:fade|global={{ duration }}
	{id}
	class="my-overlay"
	style:z-index={zIndex}
	onclick={handleClick}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="css">
	.my-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
