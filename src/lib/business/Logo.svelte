<!-- 
 @component
 - Logo 组件，用于显示logo
 - 自定义属性
-->

<script lang="ts">
	import logo from '$lib/assets/svg/logo.svg';
	import type { ClassValue } from 'svelte/elements';

	export type LogoProps = {
		class?: ClassValue;
	};

	let { class: className }: LogoProps = $props();
</script>

<img class={className} src={logo} alt="logo" draggable="false"/>

<style lang="css">
</style>
