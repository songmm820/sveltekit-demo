<script lang="ts">
	import Logo from "$lib/business/Logo.svelte";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	<div class="m-auto flex size-full flex-col py-24 text-center">
		<Logo class="drag mx-auto size-40" />

		{JSON.stringify(data)}
		<h1 class="mt-12 text-4xl font-bold">射手座</h1>

		<p class="mt-6 px-12 text-center">
			射手座是一个云端文件存储平台，您可以在任何时间、任何地点访问和管理您的文件。
		</p>
	</div>
</main>
