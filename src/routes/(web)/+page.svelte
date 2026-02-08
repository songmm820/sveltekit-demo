<script lang="ts">
	import Avatar from '$lib/business/Avatar.svelte';
	import { loginUserStore } from '$lib/stores/login-user-store.svelte';

	const loginUserData = $derived.by(() => loginUserStore.user);
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	{#if loginUserData}
		<div class="size-full desktop:size-5/6">
			<div class="flex gap-3">
				<Avatar class="size-14 desktop:size-18 shrink-0" name={loginUserData?.nickName} />
				<div class="flex flex-col justify-between">
					<div class="text-xl desktop:text-3xl font-bold">欢迎您，{loginUserData?.nickName}</div>
					<div class="text-sm desktop:text-base text-(--text-sec)">欢迎来到云服务，为保障账号数据安全，部分功能需验证身份后使用</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="css">
</style>
