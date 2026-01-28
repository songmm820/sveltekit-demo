<script lang="ts">
	import FinishedWthJoy from '$lib/layout/FinishedWthJoy.svelte';
	import { IsMobile } from '$lib/hooks/use-device.svelte';

	const isMobile = new IsMobile();
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	<div class="fixed size-full">
		<FinishedWthJoy />
	</div>

	<h1>{import.meta.env.MODE}</h1>

	<p>{isMobile.current}</p>
</main>

<style lang="css">
</style>
