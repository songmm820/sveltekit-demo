<!-- 
 @component
 - 图标组件
 - 自定义属性
	 - class: ClassValue 自定义类名
     - size: number | string 图标大小
     - color: string 图标颜色
     - name: string 图标名称
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	export type IconProps = {
		class?: ClassValue;
		size?: number | string;
		color?: string;
		name: string;
		onClick?: () => void;
	};

	let {
		class: className = '',
		size = '1em',
		name,
		color = 'currentColor',
		onClick
	}: IconProps = $props();

	function getSize() {
		if (typeof size === 'number') {
			return `${size}px`;
		}
		return size || '600px';
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	width={getSize()}
	height={getSize()}
	fill={color}
	role={onClick ? 'button' : null}
	aria-label={name}
	onkeypress={() => onClick?.()}
	onclick={() => onClick?.()}
>
	<use href={`#${name}`} />
</svg>
