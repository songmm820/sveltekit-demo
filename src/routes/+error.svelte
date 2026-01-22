<!-- 
 @component
 - 错误组件，显示错误状态码
-->
<script lang="ts">
	import { page } from '$app/state';
</script>

<main>
	<h1>错误：{page.status}</h1>
</main>
