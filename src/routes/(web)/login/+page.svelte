<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/business/Logo.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import { getZodErrorMessage } from '$lib/zod';
	import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';
	import { resolve } from '$app/paths';
	import Label from '$lib/components/form/Label.svelte';
	import { useRequest } from 'alova/client';
	import { userLoginApi } from '$lib/request/http-api/user';
	import Cookies from 'js-cookie';

	let loginFormData: SysUserLoginInput = $state({
		email: 'mmsong@yeah.net',
		password: '12345678'
	});

	const { loading, send } = useRequest(() => userLoginApi(loginFormData), {
		immediate: false
	});

	// 登录
	async function onLogin() {
		const { payload } = await send();
		const accessToken = payload?.accessToken;
		const refreshToken = payload?.refreshToken;
		if (!accessToken || !refreshToken) return;
		SvelteMessageBox.toast({
			message: '登录成功',
			status: 'success'
		});
		// 保存 accessToken 和 refreshToken 到 localStorage
		Cookies.set('accessToken', accessToken);
		Cookies.set('refreshToken', refreshToken);
		// 登录成功后，跳转到首页
		goto(resolve('/'));
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
	class="flex h-full w-full min-w-300 flex-col items-center justify-center gap-4 overflow-hidden p-6"
>
	<div class="flex w-140 flex-col items-center rounded-4xl bg-white px-12 py-8">
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
