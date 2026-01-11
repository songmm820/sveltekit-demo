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
		duration = 200,
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
			<div class="w-full h-full flex flex-col">
				{#if title}
					<div class="my-dialog-title flex justify-between items-center">
						{#if typeof title === 'string'}
							<span class="text-lg font-bold">{title}</span>
						{:else}
							{@render title()}
						{/if}
						<Button class="min-w-20" variant="link" onclick={handleClose}>关闭</Button>
					</div>
				{:else}
					<div class="my-dialog-title flex justify-between items-center">
						<span class="text-lg font-bold">弹窗标题</span>
						<Button class="min-w-20" variant="link" onclick={handleClose}>关闭</Button>
					</div>
				{/if}
				<div class="flex-1 py-3">
					{#if children}
						{@render children()}
					{/if}
				</div>

				{#if footer}
					{@render footer()}
				{:else}
					<div class="my-dialog-footer flex justify-end gap-4">
						<Button class="min-w-20" variant="outline" onclick={handleClose}>取消</Button>
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
		@apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		p-4 bg-(--background) rounded-xl border-2 border-(--border-sec);
	}
</style>
