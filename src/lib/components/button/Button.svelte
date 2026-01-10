<!-- 
 @component
 - 按钮组件，继承HTMLButtonElement的所有属性
 - 自定义属性
	 - class: ClassValue 自定义类名
	 - loading: boolean 加载状态
	 - variant: 'primary' | 'secondary' | 'danger' | 'link' 按钮类型
	 - block: boolean 是否占满父元素宽度
	 - rounded: boolean 是否圆角
     - children: Snippet 子元素
-->

<script lang="ts">
	import { cn } from '$/lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonType = 'primary' | 'outline' | 'danger' | 'success' | 'link';

	export type ButtonProps = HTMLButtonAttributes & {
		class?: ClassValue;
		loading?: boolean;
		variant?: ButtonType;
		block?: boolean;
		rounded?: boolean;
		children: Snippet;
	};
	const _id = $props.id();

	let {
		class: className = '',
		disabled,
		id = _id,
		block,
		variant = 'primary',
		rounded,
		children,
		...other
	}: ButtonProps = $props();

	const buttonVariants = cva('my-button', {
		variants: {
			variant: {
				primary: 'bg-primary text-white px-4 py-2 rounded-md hover:opacity-90',
				outline: 'border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10',
				danger: 'bg-danger text-white px-4 py-2 rounded-md hover:opacity-90',
				success: 'bg-success text-white px-4 py-2 rounded-md hover:opacity-90',
				link: 'text-primary'
			},
			block: {
				true: 'w-full',
				false: 'w-fit'
			},
			disabled: {
				true: 'opacity-80 cursor-not-allowed',
				false: ''
			},
			rounded: {
				true: 'rounded-full',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'primary',
			block: false,
			disabled: false,
			rounded: false
		}
	});
</script>

<button
	{id}
	{disabled}
	{...other}
	class={cn(buttonVariants({ variant, block, disabled, rounded }), className)}
>
	{@render children()}
</button>

<style lang="css">
	@reference '#app.css';
	.my-button {
		@apply inline-flex items-center justify-center h-fit
		transition-all duration-200;
	}
</style>
