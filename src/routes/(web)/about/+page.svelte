<script lang="ts">
	import { loadingAttachment } from '$lib/attachments/loading.svelte';

	let loading: boolean = $state(true);

	function getHelloWorld() {
		setTimeout(() => {
			loading = false;
		}, 3000);
	}

	$effect(() => {
		getHelloWorld();
	});
</script>

<main
	{@attach loadingAttachment({ loading })}
	class="flex size-full flex-col items-center justify-center"
>
	<h1>关于 {loading}</h1>
</main>
