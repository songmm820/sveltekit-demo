<!-- 
 @component
 - 文本域组件，继承HTMLTextAreaElement的所有属性
 - 自定义属性
	 - value: string 输入框的值
	 - id: string 输入框的id
	 - maxLength: number 最大输入长度
     - rows: number 文本域行数
     - readonly: boolean 是否只读
	 - onInput: (value: string) => void 输入框值变化时触发的回调函数
	 - onFormat: (value: string) => string 输入框值格式化函数

-->
<script lang="ts">
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { ClassValue, FormEventHandler, HTMLTextareaAttributes } from 'svelte/elements';

	type OmitHTMLTextAreaAttributes = Omit<
		HTMLTextareaAttributes,
		'value' | 'onchange' | 'class' | 'maxlength'
	>;

	export type TextareaProps = OmitHTMLTextAreaAttributes & {
		value?: string;
		class?: ClassValue;
		readonly?: boolean;
		maxLength?: number;
		rows?: number;
		onInput?: (value: string) => void;
		onFormat?: (value: string) => string;
	};

	const _id = $props.id();

	let {
		value = $bindable<string>(''),
		id = _id,
		class: className = '',
		rows = 3,
		maxLength,
		readonly = false,
		disabled = false,
		onInput,
		onFormat,
		...other
	}: TextareaProps = $props();

	const textareaVariants = cva('my-textarea-container', {
		variants: {
			readonly: {
				true: 'cursor-default',
				false: ''
			},
			disabled: {
				true: 'cursor-not-allowed',
				false: ''
			}
		},
		defaultVariants: {}
	});

	let textareaEl: HTMLTextAreaElement;

	const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
		onInput?.(e.currentTarget.value);
	};

	function onFormatValue(value: string) {
		if (onFormat) {
			return onFormat(value);
		}
		return value;
	}

	export function onFocus() {
		textareaEl.focus();
	}

	export function onBlur() {
		textareaEl.blur();
	}

	export function onClear() {
		value = '';
		// 触发输入框值变化事件
		textareaEl.focus();
	}
</script>

<div class={cn(textareaVariants({ readonly, disabled }), className)}>
	<textarea
		bind:this={textareaEl}
		{id}
		class="my-textarea"
		bind:value={() => value, (v) => (value = onFormatValue(v))}
		maxlength={maxLength}
		{rows}
		{readonly}
		{disabled}
		{...other}
		oninput={handleInput}
	>
	</textarea>
</div>

<style lang="css">
	@reference '#app.css';
	.my-textarea-container {
		@apply inline-flex  w-full items-center rounded-2xl
		border-2 border-transparent bg-(--background-sec) p-1.5
		caret-primary transition-all 
		placeholder:text-(--text) placeholder:opacity-50
		focus-within:border-primary
        focus-within:bg-(--background) tablet:w-80;
	}

	.my-textarea {
		@apply flex-1 cursor-[inherit] resize-none border-none bg-transparent text-base  text-(--text)
		outline-none;
	}
</style>
