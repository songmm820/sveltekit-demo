<!-- 
 @component
 - 弹窗El元素
 - 自定义属性
     - title?: Snippet | string 弹窗标题
     - width?: string | number 弹窗宽度
	 - height?: string | number 弹窗高度
	 - duration?: number 弹窗动画持续时间
     - footer?: Snippet 弹窗底部内容
	 - children?: Snippet 弹窗内容
	 - onClose: () => void 点击遮罩时触发的回调函数
-->

<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import DialogOverlay from '$lib/components/dialog/DialogOverlay.svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { translateY } from '$lib/utils/animation';

	export type DialogElProps = {
		open: boolean;
		title?: Snippet | string;
		width?: string | number;
		height?: string | number;
		duration?: number;
		footer?: Snippet;
		children?: Snippet;
		onClose: () => void;
	};

	const zIndex = useZIndex.getNext();

	let {
		open = $bindable(false),
		title,
		width,
		height,
		duration = 300,
		footer,
		children,
		onClose
	}: DialogElProps = $props();

	const handleClose = async () => {
		open = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
		onClose();
	};

	onDestroy(() => {
		useZIndex.recycle(zIndex);
	});
</script>

{#if open}
	<DialogOverlay {duration} {zIndex}>
		<div
			transition:translateY|global={{ duration }}
			class="my-dialog-container"
			style:z-index={zIndex}
			style:width
			style:height
		>
			<div class="flex h-full w-full flex-col">
				{#if title}
					<div class="my-dialog-title">
						{#if typeof title === 'string'}
							<div class="flex w-full items-center justify-center text-center text-lg font-bold">
								{title}
							</div>
						{:else}
							{@render title()}
						{/if}
					</div>
				{/if}
				<!-- 弹窗内容区域 -->
				<div class="flex-1 py-3">
					{#if children}
						{@render children()}
					{/if}
				</div>
				<!-- 弹窗底部区域 -->
				{#if footer}
					{@render footer()}
				{:else}
					<div class="my-dialog-footer flex justify-end gap-2">
						<Button class="min-w-20" variant="link" onclick={handleClose}>取消</Button>
						<Button class="min-w-20" variant="primary" onclick={handleClose}>确定</Button>
					</div>
				{/if}
			</div>
		</div>
	</DialogOverlay>
{/if}

<style lang="css">
	@reference '#app.css';

	.my-dialog-container {
		@apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
		rounded-xl border-2 border-(--border-sec) bg-(--background) p-4;
	}
</style>
