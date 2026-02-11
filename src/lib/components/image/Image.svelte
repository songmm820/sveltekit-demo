<!-- 
 @component
 - 图片组件,继承HTMLImgAttributes属性
 - 自定义属性
	 - class?: ClassValue 自定义类名
     - onClick?: () => void 点击事件
     - preview?: boolean 是否允许预览图片
-->
<script lang="ts">
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';
	import ImagePreviewDialogEl from './ImagePreviewDialogEl.svelte';
	import { mount, unmount } from 'svelte';

	export type ImageProps = Omit<HTMLImgAttributes, 'onclick' | 'src'> & {
		class?: ClassValue;
		onClick?: () => void;
		preview?: boolean;
		src?: string;
	};
	const id = $props.id();

	let imagePreviewDialogEl: ImagePreviewDialogEl | null = null;

	let {
		class: className = '',
		src = $bindable<string>(''),
		preview = true,
		alt,
		onClick,
		...other
	}: ImageProps = $props();

	const imageVariants = cva('my-image-container', {
		variants: {},
		defaultVariants: {}
	});

	// 点击图片处理函数
	function handleClickImage() {
		onClick?.();
		if (!preview) return;
		if (!imagePreviewDialogEl) {
			imagePreviewDialogEl = mount(ImagePreviewDialogEl, {
				target: document.body,
				props: {
					open: true,
					src,
					onClose: () => {
						unmount(imagePreviewDialogEl!);
						imagePreviewDialogEl = null;
					}
				}
			});
		} else {
			unmount(imagePreviewDialogEl);
			// imagePreviewDialogEl = null;
		}
	}
</script>

<!-- <ImagePreviewDialogEl open={previewOpen} {src} onClose={() => (previewOpen = false)} /> -->

<img
	{src}
	alt={alt ?? id}
	class={cn(imageVariants({}), className)}
	{...other}
	onclick={handleClickImage}
/>

<style lang="css">
	@reference '#app.css';
</style>
