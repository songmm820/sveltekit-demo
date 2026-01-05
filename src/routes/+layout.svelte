<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$/css/app.css';
	import createThemeContext, { ThemeMode } from '$lib/contexts/themeContext';

	let { children } = $props();

	createThemeContext(ThemeMode.LIGHT);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
