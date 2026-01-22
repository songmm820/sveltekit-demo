<!-- 
 @component 
 - 默认头组件
 - 自定义属性
 	 - class: ClassValue 自定义类名
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils/class';
	import type { ClassValue } from 'svelte/elements';
	import favicon from '$lib/assets/favicon.svg';

	type WebRoute = '/ui-comp' | '/' | '/about';

	type NavItem = {
		label: string;
		href: WebRoute;
	};

	type WebHeaderProps = {
		class?: ClassValue;
	};

	// 导航列表
	const NavList: NavItem[] = [
		{
			label: 'SvelteKit Demo',
			href: '/'
		},
		{
			label: 'Ui Components',
			href: '/ui-comp'
		},
		{
			label: 'About',
			href: '/about'
		}
	];

	let { class: className = '' }: WebHeaderProps = $props();

	// 获取当前路由
	const currentRoute = $derived.by(() => $page.url.pathname);
</script>

<header
	class={cn(
		'bg-(--background) text-(--text)',
		'flex items-center border-b border-(--border-sec) px-6 opacity-95 shadow-sm',
		className
	)}
>
	<img src={favicon} alt="logo" class="mr-5 size-10" />
	<nav class="container flex size-full items-center justify-between">
		<div class="flex items-center gap-6">
			{#each NavList as item (item.href)}
				<a
					href={resolve(item.href)}
					class={cn('text-lg font-medium', item.href === currentRoute && 'text-primary')}
				>
					{item.label}
				</a>
			{/each}
		</div>
	</nav>
</header>
