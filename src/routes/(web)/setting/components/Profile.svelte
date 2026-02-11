<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import { logoutUserApi } from '$lib/request/http-api/auth';
	import { useRequest } from 'alova/client';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Avatar from '$lib/business/Avatar.svelte';
	import { loginUserStore } from '$lib/stores/login-user-store.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { updateUserApi } from '$lib/request/http-api/user';
	import { onGetCurrentLoginUser } from '$lib/stores/user-auth';

	const { send } = useRequest(logoutUserApi, {
		immediate: false
	});

	const { send: updateUserSend } = useRequest(updateUserApi, {
		immediate: false
	});

	/**
	 * 更新用户名
	 *
	 * @param currentNickName 当前用户名
	 */
	function onUpdateNickName(currentNickName: string) {
		SvelteMessageBox.input({
			title: '请输入新的用户名',
			placeholder: '请输入新的用户昵称',
			message: '注意：改名有风险，手滑需谨慎！7 天冷却期可不是闹着玩的，想好了再点确认~',
			value: currentNickName,
			maxLength: 26,
			onConfirm: async (value: string) => {
				if (!value.trim()) {
					SvelteMessageBox.toast({
						message: '用户昵称不能为空',
						status: 'error'
					});
					return Promise.reject('用户昵称不能为空');
				}
				const { payload } = await updateUserSend({
					nickName: value
				});
				if (payload) {
					SvelteMessageBox.toast({
						message: '用户昵称更新成功',
						status: 'success'
					});
					await onGetCurrentLoginUser();
				}
			}
		});
	}

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
</script>

<!-- 分割线 -->
{#snippet Divider()}
	<div class="my-4 h-px bg-(--border)"></div>
{/snippet}

{#if loginUserStore.user}
	<div class="flex size-full flex-col gap-2">
		<div
			class="setting-title flex w-full flex-col items-center justify-between gap-2 tablet:flex-row tablet:gap-0"
		>
			<div class="mr-0 aspect-square w-12 tablet:mr-6">
				<Avatar class="size-full" name={loginUserStore.user.nickName} />
			</div>
			<div class="flex-1 text-center tablet:text-left">
				<div class="text-2xl font-bold">个人信息</div>
				<div class="mt-1 text-md text-(--text-sec)">请更新您的个人资料</div>
			</div>
			<div>
				<Button class="h-10 min-w-20" onclick={() => onLogout()}>
					<Icon name="out" size="20" />
					<span class="ml-1">退出登录</span>
				</Button>
			</div>
		</div>
		{@render Divider()}

		<div class="flex size-full flex-col gap-3">
			<!-- 用户昵称 -->
			<div class="setting-profile-item">
				<div class="item-babel">用户昵称</div>
				<div class="item-value">
					<Input
						value={loginUserStore.user.nickName}
						readonly
						onfocus={() => onUpdateNickName(loginUserStore.user?.nickName ?? '')}
					/>
				</div>
			</div>

			<!-- 邮箱 -->
			<div class="setting-profile-item">
				<div class="item-babel">邮箱</div>
				<div class="item-value">
					<Input
						value={loginUserStore.user.email}
						readonly
						onfocus={() => onUpdateNickName(loginUserStore.user?.nickName ?? '')}
					/>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="css">
	@reference '#app.css';

	.setting-profile-item {
		@apply flex w-full flex-col gap-4 tablet:flex-row 
		tablet:justify-between
		tablet:py-3;
	}
	.item-babel {
		@apply font-bold text-(--text) tablet:text-2xl;
	}
</style>
