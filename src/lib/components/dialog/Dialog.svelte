<!-- 
 @component
 - 弹窗组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
-->
<script lang="ts">
	import { mount, unmount, untrack } from 'svelte';
	import DialogEl, { type DialogElProps } from '$lib/components/dialog/DialogEl.svelte';

	type DialogProps = Omit<DialogElProps, 'zIndex'> & {
		open?: boolean;
	};

	let {
		open = $bindable<boolean>(false),
		width,
		height,
		onClose,
		...restProps
	}: DialogProps = $props();

	let dialogEl: DialogEl | null = null;

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

	// 关闭弹窗
	function handleCloseDialog() {
		onClose?.();
	}

	// 应用到 body 元素上
	function applyToBodyElement() {
		if (dialogEl) {
			unmount(dialogEl);
		}

		dialogEl = mount(DialogEl, {
			target: document.body,
			props: {
				...restProps,
				open: open,
				width: getWidth(),
				height: getHeight(),
				onClose: handleCloseDialog
			}
		});
	}

	// 销毁元素
	function destroyElement() {
		if (dialogEl) {
			unmount(dialogEl);
			dialogEl = null;
		}
	}

	$effect(() => {
		if (open) {
			untrack(() => {
				applyToBodyElement();
			});
		} else {
			untrack(() => {
				destroyElement();
			});
		}
	});
</script>
