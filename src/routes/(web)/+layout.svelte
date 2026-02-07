<script lang="ts">
	import logo from '$lib/assets/svg/logo.svg';
	import type { LayoutProps } from './$types';
	import { browser } from '$app/environment';
	import { createThemeContext, type ThemeEnum } from '$lib/hooks/use-theme.svelte';
	import WebHeader from '$lib/layout/WebHeader.svelte';
	import { beforeNavigate } from '$app/navigation';
	import AllowCookie from '$lib/business/AllowCookie.svelte';
	import { appShareConfig, getAllowCookie } from '$lib/stores/app-share-config.svelte';
	import { onMount } from 'svelte';

	let { children }: LayoutProps = $props();

	// 是否允许cookie
	let isAllowCookie = $derived.by(() => appShareConfig.allowCookie);

	if (browser) {
		const theme = document.documentElement.dataset.theme as ThemeEnum;
		createThemeContext(theme);
	}

	beforeNavigate((navigation) => {
		console.log('全局导航拦截：', navigation.from?.url.pathname, '→', navigation.to?.url.pathname);
	});

	onMount(() => {
		getAllowCookie();
	});
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>The Archer</title>
	<meta charset="UTF-8" />

	<!-- OG 核心标签 -->
	<meta property="og:title" content="The Archer" />
	<meta property="og:description" content="The Archer is a SvelteKit Demo." />
	<meta property="og:image" content={logo} />
	<meta property="og:type" content="website" />

	<!-- 元数据 -->
	<meta name="description" content="The Archer is a SvelteKit Demo." />
	<meta name="language" content="zh-CN" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>

	<!-- 关键词 -->
	<meta name="keywords" content="The SvelteKit Demo, TailwindCSS, Vite" />
</svelte:head>

{#if isAllowCookie !== undefined}
	<div class="flex size-full flex-col items-center justify-center">
		<div class="hidden min-h-24 w-full tablet:block">
			<div class="fixed top-0 right-0 left-0 z-2 h-24">
				{#if isAllowCookie === 'NO_SETTING'}
					<AllowCookie />
				{/if}
				<WebHeader class="h-14" />
			</div>
		</div>
		<div class="min-h-0 w-full flex-1">
			{@render children()}
		</div>
	</div>
{/if}
