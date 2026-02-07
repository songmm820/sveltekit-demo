<!-- 
 @component
 - AllowCookie 组件，用于显示允许cookie的提示
 - 自定义属性
-->

<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { setAllowCookie } from '$lib/stores/app-share-config.svelte';

	// 同意并关闭提示
	function onAlowCookie() {
		setAllowCookie(true);
	}
</script>

<div class="h-12 w-full bg-(--background-sec) text-center text-md leading-12 text-(--text-sec)">
	<span>
		本网站使用 cookie，用于在您的设备中储存信息。这些 cookie
		可以使网站正常运行，以及帮助我们改进用户体验。使用本网站，即表示您接受放置这些 cookie。
	</span>
	<Button class="ml-2 underline" variant="link" onclick={() => onAlowCookie()}>
		同意并关闭提示
	</Button>
</div>

<style lang="css">
</style>
