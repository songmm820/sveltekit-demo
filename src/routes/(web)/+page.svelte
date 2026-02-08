<script lang="ts">
	import Avatar from '$lib/business/Avatar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	{#if data?.user}
		<div class="size-5/6">
			<div class="flex gap-3">
				<Avatar class="size-18" name={data?.user?.nickName} />
				<div class="flex flex-col justify-between">
					<div class="text-3xl font-bold">欢迎您，{data?.user?.nickName}</div>
					<div class="text-base text-(--text-sec)">欢迎来到云服务，为保障账号数据安全，部分功能需验证身份后使用</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="css">
</style>
