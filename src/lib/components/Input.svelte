<!-- 
 @component
 - 输入框组件，继承HTMLInputElement的所有属性
 - 自定义属性
	 - value: string 输入框的值
	 - prefix: Snippet 前缀元素
	 - suffix: Snippet 后缀元素
	 - oninput: (value: string) => void 输入框值变化时触发的回调函数
	 - on-format: (value: string) => string 输入框值格式化函数

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
		'on-format'?: (value: string) => string;
	};

	let {
		value = $bindable<string>(''),
		id = crypto.randomUUID(),
		prefix,
		suffix,
		oninput,
		'on-format': onFormat,
		...other
	}: InputProps = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		if (onFormat) {
			value = onFormat(e.currentTarget.value);
		}
		if (oninput) {
			oninput(value);
		}
	};
</script>

<div class="my-input-container">
	{#if prefix}
		<div class="px-2">{@render prefix()}</div>
	{/if}
	<input {id} class="my-input" bind:value {...other} oninput={handleInput} />
	{#if suffix}
		<div class="px-2">{@render suffix()}</div>
	{/if}
</div>

<style lang="css">
	@reference '#app.css';
	.my-input-container {
		@apply inline-flex items-center px-4 py-2 border border-gray-300 rounded-md
        focus-within:border-primary
        transition-all duration-100 ease-in-out;
	}

	.my-input {
		@apply flex-1 border-none outline-none caret-primary;
	}
</style>
