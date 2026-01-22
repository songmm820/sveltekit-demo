<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	let props: PageProps = $props();
</script>

<main class="flex size-full flex-col items-center justify-center">
	<h1>关于</h1>

	{JSON.stringify(props)}
	{JSON.stringify(page.state)}
</main>
