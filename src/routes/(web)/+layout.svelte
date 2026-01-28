<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { browser } from '$app/environment';
	import { createThemeContext, type ThemeEnum } from '$lib/hooks/use-theme.svelte';
	import WebHeader from '$lib/layout/WebHeader.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/state';

	let { children }: LayoutProps = $props();

	if (browser) {
		const theme = document.documentElement.dataset.theme as ThemeEnum;
		createThemeContext(theme);
	}

	beforeNavigate((navigation) => {
		console.log('全局导航拦截：', navigation.from?.url.pathname, '→', navigation.to?.url.pathname);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Demo</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{#if updated.current}
	<p>页面已更新</p>
{:else}
	<div class="flex size-full flex-col items-center justify-center">
		<div class="h-15 w-full">
			<WebHeader class="fixed top-0 right-0 left-0 z-2 h-15" />
		</div>
		<div class="min-h-0 w-full flex-1">
			{@render children()}
		</div>
	</div>
{/if}
