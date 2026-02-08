<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	<h1>欢迎您，{data.user.nickName}</h1>
</main>

<style lang="css">
</style>
