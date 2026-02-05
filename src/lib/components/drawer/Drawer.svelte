<!-- 
 @component
 - 抽屉组件
 - 自定义属性
	 - open?: boolean 弹窗是否打开
	 - target?: HTMLElement 挂载到指定元素，默认挂载到 body 元素上
-->
<script lang="ts">
	import { mount, unmount, untrack } from 'svelte';
	import DrawerEl, { type DrawerElProps } from '$lib/components/drawer/DrawerEl.svelte';

	export type DrawerProps = Omit<DrawerElProps, 'zIndex'> & {
		open?: boolean;
		target?: HTMLElement | null;
	};

	let {
		open = $bindable<boolean>(false),
		target = document.body,
		onClose,
		...restProps
	}: DrawerProps = $props();

	let drawerEl: DrawerEl | null = null;

	// 关闭弹窗
	function handleCloseDialog() {
		onClose?.();
	}

	// 应用到 body 元素上
	function applyToBodyElement() {
		if (drawerEl) {
			unmount(drawerEl);
		}

		drawerEl = mount(DrawerEl, {
			target: target || document.body,
			props: {
				open: open,
				...restProps,
				onClose: handleCloseDialog
			}
		});
	}

	// 销毁元素
	function destroyElement() {
		if (drawerEl) {
			unmount(drawerEl);
			drawerEl = null;
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
