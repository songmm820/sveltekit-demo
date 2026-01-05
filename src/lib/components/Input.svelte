<!-- 
 @component
 - 输入框组件，继承HTMLInputElement的所有属性
 - 自定义属性
	 - value: string 输入框的值
	 - prefix: Snippet 前缀元素
	 - suffix: Snippet 后缀元素
	 - oninput: (value: string) => void 输入框值变化时触发的回调函数
	 - format: (value: string) => string 输入框值格式化函数

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
		format?: (value: string) => string;
	};

	let {
		value = $bindable<string>(''),
		id = crypto.randomUUID(),
		prefix,
		suffix,
		oninput,
		format,
		...other
	}: InputProps = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		if (format) {
			value = format(e.currentTarget.value);
		}
		oninput && oninput(e.currentTarget.value);
	};
</script>

<div class="my-input-container">
	{#if prefix}
		<div class="px-1">{@render prefix()}</div>
	{/if}
	<input {id} class="my-input" bind:value {...other} oninput={handleInput} />
	{#if suffix}
		<div class="px-1">{@render suffix()}</div>
	{/if}
</div>

<style lang="css">
	@reference '#app.css';
	.my-input-container {
		@apply inline-flex items-center px-3 py-2 border border-gray-300 rounded-md 
		focus-within:border-primary
		transition-all duration-200 ease-in-out;
	}
	.my-input {
		@apply border-none outline-none caret-primary;
	}
</style>
