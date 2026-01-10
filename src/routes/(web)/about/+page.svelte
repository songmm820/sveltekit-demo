<script lang="ts">
	import { useThemeContext } from '$/lib/contexts/theme-context.svelte';

	const { mode } = useThemeContext();
</script>

<p>当前主题模式: {$mode}</p>
