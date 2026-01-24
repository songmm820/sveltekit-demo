<script lang="ts">
	import FinishedWthJoy from '$lib/components/common/FinishedWthJoy.svelte';
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
	<FinishedWthJoy />

	<h1>{import.meta.env.MODE}</h1>
</main>

<style lang="css">
</style>
