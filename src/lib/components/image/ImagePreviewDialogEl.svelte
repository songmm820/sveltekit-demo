<!-- 
 @component
 - 图片预览弹窗
 - 自定义属性
	 - open?: boolean 是否打开弹窗
	 - src?: string[] | string 图片路径
	 - onClose?: () => void 关闭弹窗回调
-->
<script lang="ts">
	import DialogOverlay from '$lib/components/dialog/DialogOverlay.svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	export type ImagePreviewDialogElProps = {
		open?: boolean;
		src?: string[] | string;
		onClose?: () => void;
	};

	const zIndex = useZIndex.getNext();
	const duration = 200;

	let { open = $bindable(false), src = [], onClose }: ImagePreviewDialogElProps = $props();

	// 当前显示的图片索引
	let currentIndex = $state(0);
	// 图片集合
	let imageSrcs = $derived(Array.isArray(src) ? src : [src]);
	// 当前显示的图片
	let currentImage = $derived(imageSrcs[currentIndex]);

	async function handleClose() {
		open = false;
		// 等待弹窗动画结束
		await new Promise((resolve) => setTimeout(resolve, duration));
		// 调用关闭回调
		onClose?.();
	}

	onDestroy(() => useZIndex.recycle(zIndex));
</script>

{#if open && src && src.length > 0}
	<DialogOverlay {zIndex} {duration}>
		<div
			transition:fade|global={{ duration: duration }}
			class="w-full h-full flex flex-col items-center justify-center"
			role="dialog"
		>
			<div class="w-full h-12" aria-hidden="true" onclick={() => handleClose()}>123123</div>
			<div class="flex-1 flex items-center justify-center">
				<img src={currentImage} alt="Preview Image" aria-hidden="true" />
			</div>
		</div>
	</DialogOverlay>
{/if}

<style lang="css">
	@reference '#app.css';
</style>
