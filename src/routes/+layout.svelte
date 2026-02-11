<script lang="ts">
	import '$css/app.css';
	import '$css/scrollbar.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// IconFont 图标字体
	const iconFontScriptUrl: `/${string}.js` = '//at.alicdn.com/t/c/font_4552103_bx7zoe2fewc.js';
</script>

<svelte:head>
	<title>SvelteKit Workbench</title>
	<script src={iconFontScriptUrl}></script>
</svelte:head>

{@render children()}
