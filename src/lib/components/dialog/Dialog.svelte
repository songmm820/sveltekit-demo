<!-- 
 @component
 - 弹窗组件
 - 自定义属性
	 - open: boolean 是否打开弹窗
	 - width: string | number 弹窗宽度
	 - height: string | number 弹窗高度
	 - title?: Snippet | string 弹窗标题
	 - footer?: Snippet 弹窗底部内容
	 - children: Snippet 弹窗内容
	 - onClose: () => void 关闭弹窗时触发的回调函数
-->
<script lang="ts">
	import { mount, unmount } from 'svelte';
	import { useZIndex } from '$lib/hooks/use-z-index.svelte';
	import DialogEl, { type DialogElProps } from '$lib/components/dialog/DialogEl.svelte';

	const zIndex = useZIndex.getNext();

	type DialogProps = Omit<DialogElProps, 'zIndex'> & {
		open?: boolean;
	};

	let {
		open = $bindable<boolean>(false),
		width,
		height,
		title,
		footer,
		children,
		onClose
	}: DialogProps = $props();

	let dialogEl: ReturnType<typeof mount> | null = null;

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
		useZIndex.recycle(zIndex);
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
				zIndex,
				title,
				open,
				width: getWidth(),
				height: getHeight(),
				footer,
				children,
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
			applyToBodyElement();
		} else {
			destroyElement();
		}
	});
</script>
