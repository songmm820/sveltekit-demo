<!-- 
 @component 
 - 默认头组件
 - 自定义属性
 	 - class: ClassValue 自定义类名
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { cn } from '$lib/utils/class';
	import type { ClassValue } from 'svelte/elements';
	import logo from '$lib/assets/svg/logo.svg';
	import { goto } from '$app/navigation';
	import type { Pathname } from '$app/types';


	type NavItem = {
		label: string;
		href: Pathname;
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
	const currentRoute = $derived.by(() => page.url.pathname);

	function onGotoWorkbench() {
		goto(resolve('/login'));
	}
</script>

<header
	class={cn(
		'bg-(--background) text-(--text)',
		'flex items-center border-b border-(--border-sec) pl-7 opacity-95 shadow-sm',
		className
	)}
>
	<img src={logo} alt="logo" class="mr-5 size-10" />
	<nav class="flex size-full flex-1 items-center justify-between">
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

	<div
		role="button"
		onkeypress={() => onGotoWorkbench()}
		tabindex="0"
		class="ml-7 flex h-full w-40 items-center justify-center bg-primary text-center text-white transition-all hover:brightness-90"
		onclick={() => onGotoWorkbench()}
	>
		Login
	</div>
</header>
