<!-- 
 @component
 - 加载组件，继承HTMLDivElement的所有属性
 - 自定义属性
	 - loading: boolean 加载状态
-->

<script lang="ts">
	import { cn } from '$lib/utils/class';
	import type { ClassValue } from 'svelte/elements';

	type LoadingProps = {
		class?: ClassValue;
	};

	let { class: className }: LoadingProps = $props();
</script>

<div class={cn('flex size-full items-center justify-center', className)}>Loading...</div>
