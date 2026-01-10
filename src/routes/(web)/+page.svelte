<script lang="ts">
	import Button from '$/lib/components/button/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function onGoToUiComponentsPage() {
		goto(resolve('/ui-comp'));
	}
</script>

<main class="w-full h-full p-6 flex items-center justify-center">
	<Button onclick={onGoToUiComponentsPage}>Go To UI Components Page</Button>
</main>

<style lang="css">
</style>
