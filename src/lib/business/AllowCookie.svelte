<!-- 
 @component
 - AllowCookie 组件，用于显示允许cookie的提示
 - 自定义属性
-->

<script lang="ts">
	import { setAllowCookie } from '$lib/stores/app-share-config.svelte';
	import { cn } from '$lib/utils/class';
	import type { ClassValue } from 'svelte/elements';

	let { class: className = '' }: { class?: ClassValue } = $props();

	// 同意并关闭提示
	function onAlowCookie() {
		setAllowCookie(true);
	}
</script>

<div
	class={cn(
		'flex w-full items-center justify-center bg-(--background-sec) px-6 text-center text-md text-(--text-sec)',
		className
	)}
>
	<span>
		<span>
			本网站使用 cookie，用于在您的设备中储存信息。这些 cookie
			可以使网站正常运行，以及帮助我们改进用户体验。使用本网站，即表示您接受放置这些 cookie。
		</span>
		<span
			class="ml-2 cursor-pointer text-primary underline"
			role="button"
			tabindex="0"
			onkeypress={() => onAlowCookie()}
			onclick={() => onAlowCookie()}
		>
			我知道了，不再提示
		</span>
	</span>
</div>

<style lang="css">
</style>
