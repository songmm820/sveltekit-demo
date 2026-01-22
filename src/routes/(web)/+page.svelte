<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/button/Button.svelte';
	import { useThemeContext } from '$lib/hooks/use-theme.svelte';

	const themeCtx = useThemeContext();

	function onGoToUiComponentsPage() {
		goto(resolve('/ui-comp'));
	}

	function onToAbout() {
		goto(resolve('/about'));
	}

	function onToggleTheme() {
		themeCtx?.toggleTheme();
	}
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
	<Button onclick={onGoToUiComponentsPage}>Go To UI Components Page</Button>

	<Button onclick={onToggleTheme}>Toggle Theme</Button>

	<Button onclick={onToAbout}>About</Button>
</main>

<style lang="css">
</style>
