<script lang="ts">
	import '$css/app.css';
	import '$css/scrollbar.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>SvelteKit Workbench</title>
</svelte:head>

{@render children()}
