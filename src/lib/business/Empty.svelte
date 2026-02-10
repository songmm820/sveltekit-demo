<!-- 
 @component
 - Logo 组件，用于显示logo
 - 自定义属性
    - class: 自定义类名
    - size: 图标大小，默认 90px
    - text: 提示文本，默认 '暂无数据'
-->

<script lang="ts">
	import emptyImg from '$lib/assets/images/empty_data.png';
	import { cn } from '$lib/utils/class';
	import type { ClassValue } from 'svelte/elements';

	export type LogoProps = {
		class?: ClassValue;
		size?: number | string;
		text?: string;
	};

	let { class: className, size = 90, text = '暂无数据' }: LogoProps = $props();
	// 尺寸
	const sizeValue = $derived.by(() => (typeof size === 'number' ? `${size}px` : size));
</script>

<div class={cn('flex flex-col items-center justify-center ', className)}>
	<img
		class="size-full flex-1 object-contain"
		src={emptyImg}
		alt="Empty"
		draggable="false"
		style:width={sizeValue}
		style:height={sizeValue}
	/>
	<div class="text-center text-sm text-(--text-sec)">
		{text}
	</div>
</div>

<style lang="css">
</style>
