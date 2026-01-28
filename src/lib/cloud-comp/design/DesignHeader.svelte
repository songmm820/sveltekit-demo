<!-- 
 @component
 - 用于设计器头部
 - 自定义属性

-->
<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex size-full items-center justify-between px-4">
	<div class="text-lg font-bold">设计器 {JSON.stringify(page.params)}</div>
</div>
