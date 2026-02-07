<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import SvelteMessageBox from '$lib/components/message-box';
	import alovaInstance from '$lib/request/alova';
	import { getZodErrorMessage } from '$lib/zod';
	import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';

	let loginFormData: SysUserLoginInput = $state({
		email: 'mmsong@yeah.net',
		password: '12345678'
	});

	// 登录
	async function onLogin() {
		const res = await alovaInstance.Post('/api/user/login', loginFormData);
		console.log('登录结果：', res);
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
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6">
	{JSON.stringify(loginFormData)}
	<div class="w-100">
		<div class="flex flex-col gap-7">
			<div class="flex flex-col gap-3">
				<label for="email" class="text-base text-(--text-sec)">邮箱</label>
				<Input class="h-14" id="email" block bind:value={loginFormData.email} />
			</div>
			<div class="flex flex-col gap-3">
				<label for="password" class="text-base text-(--text-sec)">密码</label>
				<Input
					class="h-14"
					id="password"
					block
					type="password"
					bind:value={loginFormData.password}
				/>
			</div>
		</div>

		<Button class="mt-12" block onclick={() => onValidateLoginForm()}>登录</Button>
	</div>
</main>

<style lang="css">
</style>
