<script lang="ts">
	import DesignHeader from '$lib/cloud-comp/design/DesignHeader.svelte';
	import DragContainerAreaMain from '$lib/cloud-comp/design/DragContainerAreaMain.svelte';
	import DragFieldAreaAside from '$lib/cloud-comp/design/DragFieldAreaAside.svelte';
</script>

<div class="flex flex-col size-full overflow-hidden">
	<div class="h-16 w-full">
		<DesignHeader />
	</div>
	<main class="flex-1 flex size-full overflow-hidden">
		<aside class="h-full w-64">
			<DragFieldAreaAside />
		</aside>
		<div class="flex-1">
			<DragContainerAreaMain />
		</div>
	</main>
</div>

<style lang="css">
</style>
