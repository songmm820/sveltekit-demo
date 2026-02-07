import { mount, unmount } from 'svelte';
import Loading from '$lib/components/loading/Loading.svelte';
import type { Attachment } from 'svelte/attachments';

type ControlledLoadingOptions = {
	loading: boolean;
};

/**
 * loading attachment
 * 
 * @param options 加载选项
 * @returns 附件函数
 */
export function loadingAttachment(options: ControlledLoadingOptions): Attachment {
	return (element: Element) => {
		let loadingEl: Loading | null = null;
		const unsubscribe = $effect.root(() => {
			$effect(() => {
				if (options.loading) {
					loadingEl ??= mount(Loading, { target: element, props: {} });
				} else {
					if (loadingEl) {
						unmount(loadingEl);
						loadingEl = null;
					}
				}
			});
		});

		return () => {
			unsubscribe();
			if (loadingEl) {
				unmount(loadingEl);
				loadingEl = null;
			}
		};
	};
}
