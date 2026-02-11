<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/business/Logo.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';
	import { resolve } from '$app/paths';
	import Label from '$lib/components/form/Label.svelte';
	import { useRequest } from 'alova/client';
	import { currentLoginUserApi } from '$lib/request/http-api/user';
	import { page } from '$app/state';
	import { setLoginUser } from '$lib/stores/login-user-store.svelte';
	import { userLoginApi } from '$lib/request/http-api/auth';
	import type { RouteId } from '$app/types';
	import { getZodErrorMessage } from '$lib/utils/zod';

	let loginFormData: SysUserLoginInput = $state({
		email: 'mmsong@yeah.net',
		password: '12345678'
	});

	const { loading, send: sendLogin } = useRequest(userLoginApi, {
		immediate: false
	});

	const { send: sendCurrentLoginUser } = useRequest(currentLoginUserApi, {
		immediate: false
	});

	// 获取当前登录用户信息
	async function onGetLoginUser() {
		const { payload } = await sendCurrentLoginUser();
		if (!payload) return;
		setLoginUser(payload);
	}

	// 登录
	async function onLogin() {
		const { payload } = await sendLogin(loginFormData);
		const accessToken = payload?.accessToken;
		const refreshToken = payload?.refreshToken;
		if (!accessToken || !refreshToken) return;
		SvelteMessageBox.toast({
			message: '登录成功',
			status: 'success'
		});
		// 登录成功后，跳转到首页或指定的 redirectUrl
		const redirectUrl = page.url.searchParams.get('redirect') as RouteId;
		await onGetLoginUser();
		goto(resolve(redirectUrl || '/(web)'));
	}

	// 校验登录表单
	async function onValidateLoginForm() {
		const v = SysUserLoginValidator.safeParse(loginFormData);
		const error = getZodErrorMessage(v);
		if (error) {
			SvelteMessageBox.toast({
				message: error.message,
				status: 'error'
			});
			return;
		}
		onLogin();
	}

	// 去注册
	function onNavigateToRegister() {
		goto(resolve('/register'));
	}
</script>

<main
	class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6 desktop:min-w-300"
>
	<div class="rounded-4x flex w-full flex-col items-center py-8 desktop:w-140 tablet:px-12">
		<Logo class="size-46" />
		<div class="flex w-full flex-col gap-7">
			<Label text="邮箱">
				{#snippet children(id)}
					<Input class="h-14" {id} block bind:value={loginFormData.email} />
				{/snippet}
			</Label>

			<Label text="密码">
				{#snippet children(id)}
					<Input class="h-14" {id} block type="password" bind:value={loginFormData.password} />
				{/snippet}
			</Label>
		</div>

		<Button
			class="mt-12"
			block
			loading={$loading}
			disabled={$loading}
			onclick={() => onValidateLoginForm()}
		>
			登录
		</Button>
		<div>
			<Button variant="link" class="mt-4" block onclick={() => onNavigateToRegister()}>
				没有账号？去注册
			</Button>
		</div>
	</div>
</main>

<style lang="css">
</style>
