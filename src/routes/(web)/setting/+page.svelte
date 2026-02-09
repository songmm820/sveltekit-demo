<script lang="ts">
	import { loginUserStore } from '$lib/stores/login-user-store.svelte';
	import { cn } from '$lib/utils/class';
	import { page } from '$app/state';
	import type { Component } from 'svelte';
	import ProfileTabItem from './Profile.svelte';
	import NotificationTabItem from './Notification.svelte';
	import SecurityTabItem from './Security.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const loginUserData = $derived.by(() => loginUserStore.user);

	type SettingTab = {
		key: string;
		label: string;
		component: Component;
	};

	// 设置导航栏
	const SettingTabs: SettingTab[] = [
		{
			key: 'Profile',
			label: '个人信息',
			component: ProfileTabItem
		},
		{
			key: 'Notification',
			label: '通知设置',
			component: NotificationTabItem
		},
		{
			key: 'Security',
			label: '安全设置',
			component: SecurityTabItem
		}
	];

	// 取出路由上的 key 参数
	const tabKey = page.url.searchParams.get('key');
	// 选中的导航栏
	let selectedTab: SettingTab = $state(
		SettingTabs.find((tab) => tab.key === tabKey) || SettingTabs[0]
	);

	/**
	 * 选择导航栏
	 * 
	 * @param key 导航栏 key
	 */
	function onSelectTab(key: string) {
		selectedTab = SettingTabs.find((tab) => tab.key === key) || selectedTab;
		// 跳转到对应的 tab 组件
		goto(resolve(`/setting?key=${selectedTab.key}`), {});
	}
</script>

<main class="flex size-full flex-col items-center gap-4 overflow-hidden p-6">
	{JSON.stringify(tabKey)}
	{#if loginUserData}
		<div class="size-full p-3 desktop:p-0">
			<div class="flex size-full gap-3">
				<div class="flex w-full flex-col gap-2">
					<div class="text-xl font-bold desktop:text-3xl">欢迎您，{loginUserData?.nickName}</div>
					<nav class="mt-9 flex gap-8">
						{#each SettingTabs as tab (tab.key)}
							<div
								class={cn('cursor-pointer text-lg text-(--text-sec)', {
									'setting-nav-selected-tab': tab.key === selectedTab.key
								})}
								role="button"
								tabindex="0"
								onkeypress={() => onSelectTab(tab.key)}
								onclick={() => onSelectTab(tab.key)}
							>
								{tab.label}
							</div>
						{/each}
					</nav>
					<!-- Tab -->
					<div class="mt-8 flex flex-1 overflow-hidden border border-primary py-4">
						<!-- <svelte:component
							this={selectedTab.component}
						/> -->
						{#snippet Component()}
							{@const Component = selectedTab.component}
							<Component />
						{/snippet}
						{@render Component()}
						<!-- <svelte:component this={selectedTab.component} /> -->
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="css">
	@reference '#app.css';

	.setting-nav-selected-tab {
		@apply relative text-(--text) after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[''];
	}
</style>
