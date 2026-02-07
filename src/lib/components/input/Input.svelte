<!-- 
 @component
 - 输入框组件，继承HTMLInputElement的所有属性
 - 自定义属性
	 - value: string 输入框的值
	 - id: string 输入框的id
	 - rounded: boolean 是否圆角
	 - block: boolean 是否块级元素
	 - prefix: Snippet 前缀元素
	 - suffix: Snippet 后缀元素
	 - onInput: (value: string) => void 输入框值变化时触发的回调函数
	 - onFormat: (value: string) => string 输入框值格式化函数

-->
<script lang="ts">
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { ClassValue, FormEventHandler, HTMLInputAttributes } from 'svelte/elements';

	type OmitHTMLInputAttributes = Omit<
		HTMLInputAttributes,
		'value' | 'onchange' | 'prefix' | 'suffix' | 'class'
	>;

	export type InputProps = OmitHTMLInputAttributes & {
		value?: string;
		rounded?: boolean;
		block?: boolean;
		class?: ClassValue;
		prefix?: Snippet;
		suffix?: Snippet;
		onInput?: (value: string) => void;
		onFormat?: (value: string) => string;
	};

	const _id = $props.id();

	let {
		value = $bindable<string>(''),
		id = _id,
		rounded = true,
		class: className = '',
		block,
		prefix,
		suffix,
		onInput,
		onFormat,
		...other
	}: InputProps = $props();

	const inputVariants = cva('my-input-container', {
		variants: {
			rounded: {
				true: 'rounded-full',
				false: 'rounded-md'
			},
			block: {
				true: 'w-full',
				false: 'w-80'
			}
		},
		defaultVariants: {
			rounded: false,
			block: false
		}
	});

	let inputEl: HTMLInputElement;

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		onInput?.(e.currentTarget.value);
	};

	function onFormatValue(value: string) {
		if (onFormat) {
			return onFormat(value);
		}
		return value;
	}

	export function onFocus() {
		inputEl.focus();
	}

	export function onBlur() {
		inputEl.blur();
	}

	export function onClear() {
		value = '';
	}
</script>

<div class={cn(inputVariants({ rounded, block }), 'h-12', className)}>
	{#if prefix}
		<div class="px-2">{@render prefix()}</div>
	{/if}
	<input
		bind:this={inputEl}
		{id}
		class="my-input"
		bind:value={() => value, (v) => (value = onFormatValue(v))}
		{...other}
		oninput={handleInput}
	/>
	{#if suffix}
		<div class="px-2">{@render suffix()}</div>
	{/if}
</div>

<style lang="css">
	@reference '#app.css';
	.my-input-container {
		@apply inline-flex items-center border-2 border-transparent 
		bg-(--background-sec) px-6
		py-1 transition-all 
		placeholder:text-(--text) placeholder:opacity-50
		caret-primary
        focus-within:border-primary focus-within:bg-(--background);
	}

	.my-input {
		@apply h-full flex-1 border-none bg-transparent text-base text-(--text) outline-none;
	}
</style>
