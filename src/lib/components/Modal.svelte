<!-- 
 @component
 - 弹窗组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - onclose: () => void 关闭弹窗时触发的回调函数

-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type ModalProps = {
		open: boolean;
		onclose?: () => void;
		children: Snippet;
	};

	let { open = $bindable(false), children, onclose }: ModalProps = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}
</script>

{#if open}
	<div class="my-modal-mask">
		<div class="my-modal-wrapper" aria-label="Modal" tabIndex={-1}>
			<div class="my-modal-header">
				<h2 class="text-2xl font-bold">Modal Title</h2>
			</div>
			<div class="my-modal-body">
				{@render children()}
			</div>
			<div class="my-modal-footer" aria-hidden="true" onclick={handleClose}>Footer</div>
		</div>
	</div>
{/if}

<style lang="css">
	@reference '#app.css';
	.my-modal-mask {
		@apply fixed inset-0 z-10 bg-black/30 backdrop-blur-sm;
	}
	.my-modal-wrapper {
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-120 h-120 bg-white rounded-xl
        flex flex-col;
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
</style>
