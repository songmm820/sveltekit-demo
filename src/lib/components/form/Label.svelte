<!-- 
 @component
 - 标签组件
 - 自定义属性
	 - class: ClassValue 自定义类名
     - id: string 标签关联的输入元素的 id
     - text: string 标签的文本内容
     - children: Snippet 标签的内容
-->
<script lang="ts">
	import { cn } from '$lib/utils/class';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export type LabelProps = {
		id?: string;
		class?: ClassValue;
		text: string;
		children: Snippet<[id: string]>;
	};

	const _id = $props.id();

	let { id = _id, class: className = '', text, children }: LabelProps = $props();
</script>

<div class="flex flex-col gap-3">
	<label for={id} class={cn('text-xl text-(--text-sec)', className)}>{text}</label>
	{@render children(id)}
</div>
