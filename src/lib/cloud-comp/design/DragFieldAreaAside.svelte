<!-- 
 @component
 - 用于拖动字段区域
 - 自定义属性

-->
<script lang="ts">
	function handleDragStart(event: DragEvent) {
		event.dataTransfer?.setData('text/plain', '拖拽我');
	}
</script>

<div class="flex h-full w-full">
	<!-- 可拖拽元素 -->
	<div draggable="true" class="size-12" aria-hidden="true" on:dragstart={handleDragStart}>
		拖拽我
	</div>
</div>
