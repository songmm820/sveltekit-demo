<!-- 
 @component
 - 按钮组件，继承HTMLButtonElement的所有属性
 - 自定义属性
	 - loading: boolean 加载状态
     - children: Snippet 子元素
     - other: 其他HTMLButtonElement属性
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// 合并HTMLButtonElement的属性和自定义属性
	interface ButtonProps extends HTMLButtonAttributes {
		loading?: boolean;
		children: Snippet;
	}

	let { loading = false, children, ...other }: ButtonProps = $props();
</script>

<div>
	<button class="my-button" {...other}>
		{@render children()}
	</button>
</div>

<style lang="css">
	@reference '#app.css';
	.my-button {
		@apply bg-primary text-white px-4 py-2 rounded-md;
	}
</style>
