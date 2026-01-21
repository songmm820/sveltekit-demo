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

	type WebRoute = '/ui-comp' | '/';

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
		}
	];

	let { class: className = '' }: WebHeaderProps = $props();

	// 获取当前路由
	const currentRoute = $derived.by(() => $page.url.pathname);
</script>

<header
	class={cn(
		'bg-(--background) text-(--text)',
		'px-6 shadow-sm opacity-95 border-b border-(--border-sec) flex items-center',
		className
	)}
>
	<img src={favicon} alt="logo" class="size-10 mr-5" />
	<nav class="container size-full flex justify-between items-center">
		<div class="flex items-center gap-6">
			{#each NavList as item (item.href)}
				<a
					href={resolve(item.href)}
					class={cn('text-lg font-medium', {
						'text-primary': item.href === currentRoute
					})}
					>{item.label}
				</a>
			{/each}
		</div>
	</nav>
</header>
