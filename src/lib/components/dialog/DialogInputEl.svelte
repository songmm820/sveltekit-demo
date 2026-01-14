<!-- 
 @component
 - DialogInput 弹窗El元素
 - 自定义属性
	 - open: boolean 弹窗是否打开
     - title?: string 弹窗标题
	 - message?: string 弹窗内容
     - placeholder?: string 输入框占位符
	 - onCancel?: () => void 点击取消按钮时触发的回调函数
	 - onConfirm?: () => void 点击确认按钮时触发的回调函数\
	 - onClose: () => void 关闭弹窗时触发的回调函数
-->

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import DialogOverlay from '$lib/components/dialog/DialogOverlay.svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { translateY } from '$lib/utils/animation';
	import Input from '$lib/components/input/Input.svelte';

	export type DialogInputElProps = {
		open: boolean;
		title?: string;
		message?: string;
		placeholder?: string;
		onCancel?: () => Promise<void>;
		onConfirm?: (value: string) => Promise<void>;
		onClose: () => void;
	};

	const zIndex: number = useZIndex.getNext();
	const duration: number = 300;

	let {
		open = $bindable(false),
		title,
		message,
		placeholder,
		onCancel,
		onConfirm,
		onClose
	}: DialogInputElProps = $props();

	let buttonLoading: boolean = $state(false);
	let inputValue: string = $state('');
	let inputRef: Input | null = $state(null);

	// 关闭弹窗
	export async function close() {
		open = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
		onClose();
	}

	// 点击取消按钮时触发的回调函数
	async function handleCancel() {
		if (buttonLoading) {
			return;
		}
		if (onCancel) {
			await onCancel();
		}
		await close();
	}

	// 点击确认按钮时触发的回调函数
	async function handleConfirm() {
		if (buttonLoading) {
			return;
		}
		buttonLoading = true;
		if (onConfirm) {
			try {
				await onConfirm(inputValue);
			} catch (error) {
				// 如果有reject错误，则不关闭弹窗
				return Promise.reject(error);
			} finally {
				buttonLoading = false;
			}
		}
	}

	onMount(() => {
		if (inputRef) {
			inputRef.onFocus();
		}
	});

	onDestroy(() => {
		// 回收zIndex，一定要触发，否则会导致zIndex泄漏，如果是mount调用的，请必须使用unmount生命周期钩子进行回收
		useZIndex.recycle(zIndex);
	});
</script>

{#if open}
	<DialogOverlay {duration} {zIndex}>
		<div
			transition:translateY|global={{ duration }}
			class="my-dialog-alert-container w-94"
			style:z-index={zIndex}
		>
			<div class="w-full h-full flex flex-col">
				<div class="my-dialog-title">
					<div class="text-lg text-left font-bold text-var(--text)">
						{title}
					</div>
				</div>
				<!-- 弹窗内容区域 -->
				<div class="text-center pt-4 pb-4 text-(--text-sec)">
					<Input
						bind:this={inputRef}
						bind:value={inputValue}
						{placeholder}
						autocomplete="off"
						autofocus
					/>
				</div>
				{#if message}
					<div class="mb-4 text-md text-left text-(--text-sec)">
						{message}
					</div>
				{/if}
				<!-- 弹窗底部区域 -->
				<div class="my-dialog-footer flex justify-center gap-4">
					<Button class="w-1/2" variant="plain" onclick={handleCancel}>取消</Button>
					<Button class="w-1/2" loading={buttonLoading} variant="primary" onclick={handleConfirm}>
						确定
					</Button>
				</div>
			</div>
		</div>
	</DialogOverlay>
{/if}

<style lang="css">
	@reference '#app.css';

	.my-dialog-alert-container {
		@apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		p-6 bg-(--background) rounded-xl border-2 border-(--border-sec);
	}
</style>
