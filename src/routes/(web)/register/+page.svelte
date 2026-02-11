<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/business/Logo.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import { SysUserRegisterValidator, type SysUserRegisterInput } from '$lib/zod/user';
	import { resolve } from '$app/paths';
	import Label from '$lib/components/form/Label.svelte';
	import { useRequest } from 'alova/client';
	import { userRegisterApi } from '$lib/request/http-api/user';
	import { getZodErrorMessage } from '$lib/utils/zod';

	let registerFormData: SysUserRegisterInput = $state({
		nickName: 'SongMingMing',
		email: 'mmsong@yeah.net',
		password: '12345678'
	});

	const { loading, send } = useRequest(userRegisterApi, {
		immediate: false
	});

	// 注册
	async function onRegister() {
		const { payload } = await send(registerFormData);
		if (!payload?.userId) return;
		SvelteMessageBox.toast({
			message: '注册成功',
			status: 'success'
		});
		goto(resolve('/login'));
	}

	// 校验登录表单
	async function onValidateLoginForm() {
		const v = SysUserRegisterValidator.safeParse(registerFormData);
		const error = getZodErrorMessage(v);
		if (error) {
			SvelteMessageBox.toast({
				message: error.message,
				status: 'error'
			});
			return;
		}
		onRegister();
	}

	// 去登录
	function onNavigateToLogin() {
		goto(resolve('/login'));
	}
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	<div class="flex w-full flex-col items-center tablet:px-12 desktop:w-140">
		<Logo class="size-46" />
		<div class="flex w-full flex-col gap-7">
			<Label text="昵称">
				{#snippet children(id)}
					<Input class="h-14" {id} block bind:value={registerFormData.nickName} />
				{/snippet}
			</Label>
			<Label text="邮箱">
				{#snippet children(id)}
					<Input class="h-14" {id} block bind:value={registerFormData.email} />
				{/snippet}
			</Label>
			<Label text="密码">
				{#snippet children(id)}
					<Input class="h-14" {id} block type="password" bind:value={registerFormData.password} />
				{/snippet}
			</Label>
		</div>

		<Button
			class="mt-12"
			loading={$loading}
			disabled={$loading}
			block
			onclick={() => onValidateLoginForm()}
		>
			注册
		</Button>
		<div>
			<Button variant="link" class="mt-4" block onclick={() => onNavigateToLogin()}>
				已有账号？去登录
			</Button>
		</div>
	</div>
</main>

<style lang="css">
</style>
