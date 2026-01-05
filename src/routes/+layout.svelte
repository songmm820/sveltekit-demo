<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$/css/app.css';
	import createThemeContext, { ThemeMode } from '$lib/contexts/themeContext';

	let { children } = $props();

	// 初始化主题上下文为 LIGHT 模式
	createThemeContext(ThemeMode.LIGHT);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Hello world!</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{@render children()}
