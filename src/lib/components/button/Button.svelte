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
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonType =
		| 'primary'
		| 'outline'
		| 'danger'
		| 'success'
		| 'link'
		| 'plain'
		| 'warning';

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
		loading = false,
		disabled,
		id = _id,
		block,
		variant = 'primary',
		rounded = true,
		children,
		...other
	}: ButtonProps = $props();

	const buttonVariants = cva('my-button', {
		variants: {
			variant: {
				primary: 'rounded-md bg-primary px-4 py-2 text-white hover:brightness-110 active:brightness-95',
				outline: 'rounded-md border-2 border-primary px-4 py-2 text-primary hover:bg-primary/10',
				danger: 'rounded-md bg-danger px-4 py-2 text-white hover:brightness-110 active:brightness-95',
				success: 'rounded-md bg-success px-4 py-2 text-white hover:brightness-110 active:brightness-95',
				link: 'text-primary hover:brightness-110 active:brightness-95',
				plain: 'rounded-md bg-(--background-sec) px-4 py-2 text-(--text-sec) hover:brightness-98 active:brightness-95',
				warning: 'rounded-md bg-warning px-4 py-2 text-white hover:brightness-110 active:brightness-95'
			},
			block: {
				true: 'w-full',
				false: 'w-fit'
			},
			disabled: {
				true: 'cursor-not-allowed opacity-80',
				false: 'cursor-pointer'
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

{#snippet loadingIcon()}
	{#if ['danger', 'warning', 'success'].includes(variant)}
		<div
			class="mr-1.5 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"
		></div>
	{:else}
		<div
			class="mr-1.5 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-primary"
		></div>
	{/if}
{/snippet}

<button
	{id}
	{disabled}
	{...other}
	class={cn(buttonVariants({ variant, block, disabled, rounded }), className)}
>
	{#if loading}
		{@render loadingIcon()}
	{/if}
	{@render children()}
</button>

<style lang="css">
	@reference '#app.css';
	.my-button {
		@apply inline-flex h-12 items-center justify-center transition-all;
	}
</style>
