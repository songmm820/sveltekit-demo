<!-- 
 @component
 - 抽屉组件
-->
<script lang="ts">
	import { mount, unmount, untrack } from 'svelte';
	import DrawerEl, { type DrawerElProps } from '$lib/components/drawer/DrawerEl.svelte';

	type DrawerProps = Omit<DrawerElProps, 'zIndex'> & {
		open?: boolean;
	};

	let { open = $bindable<boolean>(false), onClose, ...restProps }: DrawerProps = $props();

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
			target: document.body,
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
