<script lang="ts">
	import { loginUserStore } from '$lib/stores/login-user-store.svelte';
	import { cn } from '$lib/utils/class';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import Empty from '$lib/business/Empty.svelte';

	const loginUserData = $derived.by(() => loginUserStore.user);

	type SettingTab = {
		key: string;
		label: string;
	};

	// 设置导航栏
	const SettingTabs: SettingTab[] = [
		{
			key: 'Profile',
			label: '个人信息'
		},
		{
			key: 'Notification',
			label: '通知设置'
		},
		{
			key: 'Security',
			label: '安全设置'
		}
	];

	// 取出路由上的 key 参数
	const tabKey = $derived.by(() => page.url.searchParams.get('key'));
	// 选中的导航栏
	const selectedKey: SettingTab['key'] = $derived.by(() => {
		if (!tabKey) return SettingTabs[0].key;
		return tabKey;
	});

	/**
	 * 选择导航栏
	 *
	 * @param key 导航栏 key
	 */
	async function onSelectTab(key: string) {
		const query = new SvelteURLSearchParams();
		query.set('key', key);
		const url = `/(web)/setting?key=${key}` as '/setting';
		await goto(resolve(url));
	}
</script>

<main class="flex size-full flex-col items-center gap-4 overflow-hidden p-6">
	{#if loginUserData}
		<div class="size-full p-3 desktop:p-0">
			<div class="flex size-full gap-3 justify-center">
				<div class="flex w-full desktop:w-300 flex-col gap-2">
					<div class="text-xl font-bold desktop:text-3xl">欢迎您，{loginUserData?.nickName}</div>
					<nav class="mt-9 flex gap-8">
						{#each SettingTabs as tab (tab.key)}
							<div
								class={cn('cursor-pointer text-lg text-(--text-sec)', {
									'setting-nav-selected-tab': tab.key === selectedKey
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
					<div class="mt-8 flex flex-1 overflow-hidden py-4">
						{#await import(`./components/${selectedKey}.svelte`) then { default: Component }}
							<Component />
						{:catch error}
							<div class="size-full flex items-center justify-center">
								<Empty size="40%" text={error.message} />
							</div>
						{/await}
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
