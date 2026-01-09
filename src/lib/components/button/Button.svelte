<!-- 
 @component
 - 按钮组件，继承HTMLButtonElement的所有属性
 - 自定义属性
	 - class: ClassValue 自定义类名
	 - loading: boolean 加载状态
	 - variant: 'primary' | 'secondary' | 'danger' | 'link' 按钮类型
     - children: Snippet 子元素
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonType = 'primary' | 'secondary' | 'danger' | 'link';

	export type ButtonProps = HTMLButtonAttributes & {
		class?: ClassValue;
		loading?: boolean;
		variant?: ButtonType;
		children: Snippet;
	};
	const _id = $props.id();

	let {
		// loading = false,
		class: className = '',
		disabled = false,
		id = _id,
		variant = 'primary',
		children,
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
		@apply text-white px-4 py-2 min-w-30 rounded-md inline-flex items-center justify-center;
	}

	.primary {
		@apply bg-primary hover:bg-primary/96;
	}
</style>
