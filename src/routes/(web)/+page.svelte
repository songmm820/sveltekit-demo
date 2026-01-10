<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/button/Button.svelte';
	import { useThemeContext } from '$lib/hooks/use-theme.svelte';

	const themeCtx = useThemeContext();

	function onGoToUiComponentsPage() {
		goto(resolve('/ui-comp'));
	}

	function onToggleTheme() {
		themeCtx?.toggleTheme();
	}
</script>

<main class="w-full h-full p-6 flex flex-col items-center justify-center gap-4">
	<Button onclick={onGoToUiComponentsPage}>Go To UI Components Page</Button>

	<Button onclick={onToggleTheme}>Toggle Theme</Button>
</main>

<style lang="css">
</style>
