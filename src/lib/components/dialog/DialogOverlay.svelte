<!-- 
 @component
 - 弹窗遮罩组件
 - 自定义属性
	 - zIndex: number 弹窗遮罩的 z-index 值
	 - children?: Snippet 遮罩子元素
	 - onClose: () => void 点击遮罩时触发的回调函数
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	export type OverlayProps = {
		zIndex: number;
		children?: Snippet;
	};

	const _id = $props.id();

	let { zIndex, children }: OverlayProps = $props();
</script>

<div id={_id} class="my-overlay" style:z-index={zIndex}>
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
