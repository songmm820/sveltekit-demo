<!-- 
 @component
 - Confirm警示弹窗El元素
 - 自定义属性
	 - open: boolean 弹窗是否打开
     - title?: string 弹窗标题
	 - message?: string 弹窗内容
	 - type?: 'error' | 'warning' | 'primary' 弹窗类型
	 - onCancel?: () => void 点击取消按钮时触发的回调函数
	 - onConfirm?: () => void 点击确认按钮时触发的回调函数\
	 - onClose: () => void 关闭弹窗时触发的回调函数
-->

<script lang="ts">
	import { onDestroy } from 'svelte';
	import Button, { type ButtonProps } from '$lib/components/button/Button.svelte';
	import DialogOverlay from '$lib/components/dialog/DialogOverlay.svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import { translateY } from '$lib/utils/animation';

	export type DialogConfirmElProps = {
		open: boolean;
		title?: string;
		message?: string;
		type?: 'error' | 'warning' | 'primary';
		onCancel?: () => Promise<void>;
		onConfirm?: () => Promise<void>;
		onClose: () => void;
	};

	const zIndex: number = useZIndex.getNext();
	const duration: number = 200;

	const buttonTypeMap: Record<
		Required<DialogConfirmElProps>['type'],
		Required<ButtonProps>['variant']
	> = {
		error: 'danger',
		warning: 'warning',
		primary: 'primary'
	};

	let {
		open = $bindable(false),
		title,
		type = 'primary',
		message,
		onCancel,
		onConfirm,
		onClose
	}: DialogConfirmElProps = $props();

	let buttonLoading = $state<boolean>(false);

	const handleClose = async () => {
		open = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
		onClose();
	};

	// 点击取消按钮时触发的回调函数
	async function handleCancel() {
		if (buttonLoading) {
			return;
		}
		if (onCancel) {
			await onCancel();
		}
		handleClose();
	}

	// 点击确认按钮时触发的回调函数
	async function handleConfirm() {
		if (buttonLoading) {
			return;
		}
		buttonLoading = true;
		if (onConfirm) {
			await onConfirm();
		}
		buttonLoading = false;
		handleClose();
	}

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
					<div class="text-lg text-center font-bold text-var(--text)">
						{title}
					</div>
				</div>
				<!-- 弹窗内容区域 -->
				<div class="text-center pt-4 pb-6 text-(--text-sec)">
					{message}
				</div>
				<!-- 弹窗底部区域 -->
				<div class="my-dialog-footer flex justify-end gap-4">
					<Button class="w-1/2" variant="plain" onclick={handleCancel}>取消</Button>
					<Button
						class="w-1/2"
						loading={buttonLoading}
						variant={buttonTypeMap[type]}
						onclick={handleConfirm}
					>
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
