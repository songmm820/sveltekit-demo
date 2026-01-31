<!-- 
 @component
 - 抽屉El组件
 - 自定义属性
     - title?: Snippet | string 弹窗标题
	 - size?: string | number 抽屉宽度或高度
	 - direction?: 'top' | 'bottom' | 'left' | 'right' 抽屉打开方向
	 - duration?: number 抽屉动画持续时间
	 - children?: Snippet 抽屉内容
	 - onClose: () => void 点击遮罩时触发的回调函数
	 
-->

<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import DialogOverlay from '$lib/components/dialog/Overlay.svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { translateX, translateY } from '$lib/utils/animation';
	import { cva } from 'class-variance-authority';

	export type DrawerElProps = {
		open: boolean;
		title?: Snippet | string;
		size?: string | number;
		duration?: number;
		direction?: 'top' | 'bottom' | 'left' | 'right';
		children?: Snippet;
		onClose: () => void;
	};

	const zIndex = useZIndex.getNext();

	let {
		open = $bindable(false),
		title,
		size = '50%',
		direction = 'bottom',
		duration = 300,
		children,
		onClose
	}: DrawerElProps = $props();

	// 动画函数
	const drawerTransitions = $derived({
		top: {
			width: '100%',
			height: typeof size === 'string' ? size : `${size}px`,
			animate: translateY,
			reverse: false
		},
		bottom: {
			width: '100%',
			height: typeof size === 'string' ? size : `${size}px`,
			animate: translateY,
			reverse: true
		},
		left: {
			width: typeof size === 'string' ? size : `${size}px`,
			height: '100%',
			animate: translateX,
			reverse: true
		},
		right: {
			width: typeof size === 'string' ? size : `${size}px`,
			height: '100%',
			animate: translateX,
			reverse: false
		}
	});

	let transitionFn = $derived(drawerTransitions[direction].animate);
	let reverse = $derived(drawerTransitions[direction].reverse);

	const handleClose = async () => {
		open = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
		onClose();
	};

	const drawerVariants = cva('my-drawer-container', {
		variants: {
			direction: {
				top: 'top-0 rounded-b-xl',
				bottom: 'bottom-0 rounded-t-xl',
				left: 'left-0 rounded-r-xl',
				right: 'right-0 rounded-l-xl'
			}
		},
		defaultVariants: {
			direction: 'bottom'
		}
	});

	onDestroy(() => {
		useZIndex.recycle(zIndex);
	});
</script>

{#if open}
	<DialogOverlay {duration} {zIndex} onClick={handleClose}>
		<div
			data-slot="drawer"
			data-direction={direction}
			class={drawerVariants({ direction })}
			transition:transitionFn|global={{
				duration,
				reverse,
				full: true
			}}
			style:z-index={zIndex}
			style:width={drawerTransitions[direction].width}
			style:height={drawerTransitions[direction].height}
		>
			<div class="flex h-full w-full flex-col">
				{#if title}
					<div class="my-drawer-title">
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
			</div>
		</div>
	</DialogOverlay>
{/if}

<style lang="css">
	@reference '#app.css';

	.my-drawer-container {
		@apply fixed bg-(--background) p-4;
	}
</style>
