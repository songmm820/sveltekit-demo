<!-- 
 @component
 - 用于拖动容器区域
 - 自定义属性

-->
<script lang="ts">
	let dragFieldAreaMain: HTMLElement | null = null;

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const dataTransfer = event.dataTransfer;
		if (!dataTransfer) return;
		console.log('drop', dataTransfer?.getData('text/plain'));
	}
</script>

<div class="flex h-full w-full">
	<div
		aria-hidden="true"
		bind:this={dragFieldAreaMain}
		class="ml-6 flex-1"
		on:drop={handleDrop}
		on:dragover={handleDragOver}
	>
		worksheet edit drag field area main
	</div>
</div>
