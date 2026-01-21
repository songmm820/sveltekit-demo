<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$css/app.css';
	import '$css/scrollbar.css';
	import type { LayoutProps } from './$types';
	import { browser } from '$app/environment';
	import { createThemeContext, type ThemeEnum } from '$lib/hooks/use-theme.svelte';
	import WebHeader from '$lib/layout/WebHeader.svelte';

	let { children }: LayoutProps = $props();

	if (browser) {
		const theme = document.documentElement.dataset.theme as ThemeEnum;
		createThemeContext(theme);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Demo</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div class="w-full h-15">
	<WebHeader class="h-15 fixed top-0 left-0 right-0 z-2" />
</div>

{@render children()}
