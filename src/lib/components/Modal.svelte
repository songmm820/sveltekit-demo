<!-- 
 @component
 - 弹窗组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - width?: string | number 弹窗宽度
	 - height?: string | number 弹窗高度
	 - title?: Snippet | string 弹窗标题
	 - children: Snippet 弹窗内容
	 - onclose: () => void 关闭弹窗时触发的回调函数

-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button, { ButtonTypeEnum } from './Button.svelte';

	type ModalProps = {
		open: boolean;
		width?: string | number;
		height?: string | number;
		title?: Snippet | string;
		footer?: Snippet;
		children: Snippet;
		onclose?: () => void;
	};

	let dialogEl: HTMLDialogElement | undefined = $state();

	let {
		open = $bindable(false),
		title,
		width,
		height,
		footer,
		children,
		onclose
	}: ModalProps = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}

	function getWidth() {
		if (typeof width === 'number') {
			return `${width}px`;
		}
		return width || '600px';
	}

	function getHeight() {
		if (typeof height === 'number') {
			return `${height}px`;
		}
		return height || '600px';
	}

	const onCloseModal = (e: MouseEvent) => {
		if (e.target === dialogEl) handleClose();
	};

	$effect(() => {
		if (open && dialogEl) {
			dialogEl.showModal();
		}
	});
</script>

{#if open}
	<dialog
		bind:this={dialogEl}
		style:width={getWidth()}
		style:height={getHeight()}
		class="my-dialog rounded-2xl m-auto"
		onclose={handleClose}
		onclick={onCloseModal}
	>
		<div class="my-modal-wrapper w-full h-full flex flex-col" aria-label="Modal">
			<!-- Header -->
			{#if title}
				<div class="my-modal-header flex justify-between items-center h-12 px-4">
					{#if typeof title === 'string'}
						<h2 class="text-2xl font-bold">{title}</h2>
					{:else}
						{@render title()}
					{/if}
				</div>
			{/if}
			<!-- Body -->
			<div class="my-modal-body flex-1 px-4 py-4">
				{@render children()}
			</div>
			<!-- Footer -->
			{#if footer}
				<div class="my-modal-footer flex justify-end items-center h-14 px-4">
					{@render footer()}
				</div>
			{:else}
				<div
					class="my-modal-footer flex justify-end items-center h-14 px-4"
					aria-hidden="true"
					onclick={handleClose}
				>
					<Button variant={ButtonTypeEnum.primary} onclick={handleClose}>确定</Button>
				</div>
			{/if}
		</div>
	</dialog>
{/if}

<style lang="css">
	@reference '#app.css';
	.my-dialog::backdrop {
		@apply bg-[rgba(0,0,0,0.3)] backdrop-blur-sm;
	}
</style>
