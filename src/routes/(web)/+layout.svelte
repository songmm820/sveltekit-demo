<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$/css/app.css';
	import '$/css/scrollbar.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Demo</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{@render children()}
