<!-- 
 @component
 - 浮动元素
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - className: ClassValue 自定义类名
	 - position: FloatElementPosition 弹窗位置
	 - children: Snippet 弹窗内容
-->
<script lang="ts">
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { fade } from '$lib/utils/animation';
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import { onDestroy, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type FloatElementPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

	export type IconProps = {
		open?: boolean;
		class?: ClassValue;
		position?: FloatElementPosition;
		children: Snippet;
	};

	let {
		class: className = '',
		open = $bindable(true),
		position = 'top-left',
		children
	}: IconProps = $props();

	const zIndex = useZIndex.getNext();

	const floatElementVariants = cva('my-float-element', {
		variants: {
			position: {
				'top-left': 'top-6 left-6',
				'top-right': 'top-6 right-6',
				'bottom-left': 'bottom-6 left-6',
				'bottom-right': 'bottom-6 right-6'
			}
		},
		defaultVariants: {
			position: 'top-left'
		}
	});

	onDestroy(() => {
		useZIndex.recycle(zIndex);
	});
</script>

{#if open}
	<div
		transition:fade|global={{ duration: 300 }}
		class={cn(floatElementVariants({ position }), className)}
		style:z-index={zIndex}
	>
		{@render children()}
	</div>
{/if}

<style lang="css">
	@reference '#app.css';
	.my-float-element {
		@apply fixed;
	}
</style>
