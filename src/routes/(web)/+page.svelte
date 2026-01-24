<script lang="ts">
	import FinishedWthJoy from '$lib/layout/FinishedWthJoy.svelte';
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	<div class="fixed size-full">
		<FinishedWthJoy />
	</div>

	<h1>{import.meta.env.MODE}</h1>
</main>

<style lang="css">
</style>
