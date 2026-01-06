<!-- 
 @component
 - 弹窗组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - children: Snippet 弹窗内容
	 - onclose: () => void 关闭弹窗时触发的回调函数

-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type ModalProps = {
		open: boolean;
		title?: Snippet | string;
		children: Snippet;
		onclose?: () => void;
	};

	let dialogEl: HTMLDialogElement | undefined = $state();

	let { open = $bindable(false), title, children, onclose }: ModalProps = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}

	const onClickModal = (e: MouseEvent) => {
		if (e.target === dialogEl) dialogEl.close();
	};

	$effect(() => {
		if (open && dialogEl) {
			dialogEl.showModal();
		}
	});
</script>

<dialog bind:this={dialogEl} class="my-dialog" onclose={handleClose} onclick={onClickModal}>
	<div class="my-modal-wrapper" aria-label="Modal">
		{#if title}
			<div class="my-modal-header">
				{#if typeof title === 'string'}
					<h2 class="text-2xl font-bold">{title}</h2>
				{:else}
					{@render title()}
				{/if}
			</div>
		{/if}
		<div class="my-modal-body">
			{@render children()}
		</div>
		<div class="my-modal-footer" aria-hidden="true" onclick={handleClose}>Footer</div>
	</div>
</dialog>

<style lang="css">
	@reference '#app.css';
	.my-dialog {
		@apply w-150 h-150 rounded-2xl m-auto;
	}
	.my-dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.my-dialog::backdrop {
		@apply bg-[rgba(0,0,0,0.3)];
	}
	.my-modal-wrapper {
		@apply w-full h-full flex flex-col;
	}
	.my-modal-header {
		@apply flex justify-between items-center h-12 px-4;
	}
	.my-modal-body {
		@apply flex-1 px-4 py-4;
	}
	.my-modal-footer {
		@apply flex justify-end items-center h-14 px-4;
	}

	.my-dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
