<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$/css/app.css';
	import '$/css/scrollbar.css';
	import createThemeContext, { ThemeMode } from '$lib/contexts/themeContext';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// 初始化主题上下文为 LIGHT 模式
	createThemeContext(ThemeMode.LIGHT);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Demo</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{@render children()}
