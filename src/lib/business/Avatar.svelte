<!-- 
 @component
 - Avatar 组件，用于显示头像
 - 自定义属性
    - rounded: 是否圆角头像，默认 true
    - className: 自定义类名
    - name: 用户名
-->

<script lang="ts">
	import { cn } from '$lib/utils/class';
	import { cva } from 'class-variance-authority';
	import type { ClassValue } from 'svelte/elements';

	export type AvatarProps = {
		class?: ClassValue;
		name: string;
		rounded?: boolean;
		onClick?: () => void;
	};

	let { class: className, name, rounded = true, onClick }: AvatarProps = $props();

	const avatarVariants = cva('my-avatar h-10 w-10', {
		variants: {
			rounded: {
				true: 'rounded-full',
				false: 'rounded-md'
			}
		},
		defaultVariants: {
			rounded: true
		}
	});
</script>

<div
	class={cn(avatarVariants({ rounded }), className)}
	role="button"
	tabindex="0"
	onkeypress={onClick}
	onclick={onClick}
>
	<!-- 取用户姓名的第一个字符 -->
	<div
		class="inline-flex h-full w-full items-center justify-center rounded-[inherit] bg-primary text-center text-white"
	>
		{name[0]}
	</div>
</div>

<style lang="css">
</style>
