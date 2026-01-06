<!-- 
 @component
 - 按钮组件，继承HTMLButtonElement的所有属性
 - 自定义属性
	 - loading: boolean 加载状态
     - children: Snippet 子元素
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// 合并HTMLButtonElement的属性和自定义属性
	type ButtonProps = HTMLButtonAttributes & {
		class?: ClassValue;
		loading?: boolean;
		children: Snippet;
	};

	const _id = $props.id();

	let {
		// loading = false,
		children,
		disabled = false,
		id = _id,
		class: className = '',
		...other
	}: ButtonProps = $props();
</script>

<button
	{id}
	{disabled}
	{...other}
	class={[
		'my-button',
		className,
		disabled ? 'bg-primary/80 cursor-not-allowed' : 'bg-primary hover:bg-primary/96'
	]}
>
	{@render children()}
</button>

<style lang="css">
	@reference '#app.css';
	.my-button {
		@apply text-white px-4 py-2 rounded-md inline-flex items-center justify-center;
	}
</style>
