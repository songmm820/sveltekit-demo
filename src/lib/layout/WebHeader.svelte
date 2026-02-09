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
	import { loginUserStore } from '$lib/stores/login-user-store.svelte';
	import Avatar from '$lib/business/Avatar.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import Hover from '$lib/components/interaction/Hover.svelte';
	import { useRequest } from 'alova/client';
	import { logoutUserApi } from '$lib/request/http-api/auth';
	import type { RouteId } from '$app/types';

	type NavItem = {
		label: string;
		href: RouteId;
	};

	type WebHeaderProps = {
		class?: ClassValue;
	};

	// 导航列表
	const NavList: NavItem[] = [
		{
			label: '首页',
			href: '/(web)'
		},
		{
			label: '组件库',
			href: '/(web)/ui-comp'
		},
		{
			label: '关于',
			href: '/(web)/about'
		}
	];

	let { class: className = '' }: WebHeaderProps = $props();
	// 获取当前路由
	const currentRoute = $derived.by(() => page.url.pathname);
	// 判断是否登录
	const isLogin: boolean = $derived.by(() => Boolean(loginUserStore.user?.id));

	const { send } = useRequest(() => logoutUserApi(), {
		immediate: false
	});

	// 退出登录
	function onLogout() {
		SvelteMessageBox.confirm({
			title: '确认退出登录吗？',
			message: '退出登录后，您需要重新登录才能继续使用云服务，是否继续？',
			confirmText: '退出登录',
			cancelText: '取消',
			onConfirm: async () => {
				const res = await send();
				if (res.payload) {
					goto(resolve('/login'));
				}
			}
		});
	}

	// 跳转工作台
	function onGotoLogin() {
		goto(resolve('/login'));
	}
</script>

<header
	class={cn(
		'bg-(--background) text-(--text)',
		'flex items-center border-b border-(--border-sec) pr-4 pl-7 opacity-95 shadow-sm',
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

	{#if isLogin && loginUserStore.user?.nickName}
		<Hover as="div" class="p-1" onClick={() => onLogout()}>
			<Avatar rounded={true} name={loginUserStore.user?.nickName} />
		</Hover>
	{:else}
		<div
			role="button"
			onkeypress={() => onGotoLogin()}
			tabindex="0"
			class="ml-7 flex h-full w-40 items-center justify-center bg-primary text-center text-white transition-all hover:brightness-90"
			onclick={() => onGotoLogin()}
		>
			Login
		</div>
	{/if}
</header>
