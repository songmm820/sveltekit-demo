<!-- 
 @component
 - 输入框组件，继承HTMLInputElement的所有属性
 - 自定义属性
	 - value: string 输入框的值
	 - prefix: Snippet 前缀元素
	 - suffix: Snippet 后缀元素
	 - oninput: (value: string) => void 输入框值变化时触发的回调函数
	 - onformat: (value: string) => string 输入框值格式化函数

-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements';

	type OmitHTMLInputAttributes = Omit<
		HTMLInputAttributes,
		'value' | 'onchange' | 'prefix' | 'suffix'
	>;

	type InputProps = OmitHTMLInputAttributes & {
		value?: string;
		prefix?: Snippet;
		suffix?: Snippet;
		oninput?: (value: string) => void;
		onformat?: (value: string) => string;
	};

	const _id = $props.id();

	let {
		value = $bindable<string>(''),
		id = _id,
		prefix,
		suffix,
		oninput,
		onformat,
		...other
	}: InputProps = $props();

	let inputEl: HTMLInputElement;

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		oninput?.(e.currentTarget.value);
	};

	function onFormatValue(value: string) {
		if (onformat) {
			return onformat(value);
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

<div class="my-input-container">
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
		@apply inline-flex items-center rounded-md w-full h-11 px-6 
		text-md text-(--color-text) 
		bg-(--color-bg-sec) focus-within:bg-(--color-bg)
		border border-transparent focus-within:border-primary 
		placeholder:text-(--color-text) placeholder:opacity-50
        transition-all duration-100 ease-in-out;
	}

	.my-input {
		@apply flex-1 border-none outline-none caret-primary;
	}
</style>
