<!-- 
 @component
 - Hover 组件，用于显示鼠标悬停时的效果
 - 自定义属性
	 - className: ClassValue 自定义类名
-->

<script lang="ts">
	import { cn } from '$lib/utils/class';
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	type AsElement = 'div' | 'button' | 'a' | 'span';

	type HoverBaseProps = {
		class?: ClassValue;
		children: Snippet;
		as?: AsElement;
		onClick?: () => void;
	};
	export type HoverProps = HoverBaseProps &
		(
			| (HTMLAttributes<HTMLButtonElement> & { as: 'button' })
			| (HTMLAttributes<HTMLAnchorElement> & { as: 'a' })
			| (HTMLAttributes<HTMLElement> & { as?: Exclude<AsElement, 'button' | 'a'> })
		);

	let { class: className, as = 'div', onClick, children }: HoverBaseProps = $props();
</script>

<svelte:element
	this={as}
	role="button"
	tabindex="0"
	onkeypress={onClick}
	class={cn('flex cursor-pointer rounded-sm transition-all hover:bg-(--background-sec)', className)}
	onclick={onClick}
>
	{@render children()}
</svelte:element>
