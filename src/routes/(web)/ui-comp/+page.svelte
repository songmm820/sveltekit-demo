<script lang="ts">
	import { Button } from '$lib/components/button';
	import debounce from '$lib/utils/debounce';
	import Input from '$lib/components/input/Input.svelte';
	import useScrollBottom from '$lib/hooks/use-scroll-bottom.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { confirm } from '$lib/components/dialog/dialog-alert';

	const handleReachBottom = () => {
		// console.log('reach bottom');
	};

	let dialogOpenOuter = $state<boolean>(false);
	let dialogOpenInner = $state<boolean>(false);

	const debounceOnReachBottom = debounce(handleReachBottom, 500);

	const handleConfirm = (type: 'error' | 'warning' | 'primary') => {
		confirm({
			title: '确认删除',
			type: type,
			message:
				'确定要删除吗？真的要删除吗？删除后无法恢复！很长时间不删除，会自动删除。确定要删除吗？真的要删除吗？删除后无法恢复！很长时间不删除，会自动删除。确定要删除吗？真的要删除吗？删除后无法恢复！很长时间不删除，会自动删除。',
			onConfirm: async () => {
				// console.log('确认删除');
				// 延迟3秒模拟异步操作
				await new Promise((resolve) => setTimeout(resolve, 3000));
				console.log('删除成功');
			},
			onCancel: () => {}
		});
	};

	useScrollBottom(() => document, {
		threshold: 0,
		onReachBottom: debounceOnReachBottom
	});
</script>

<main class="w-full h-full p-6">
	<h1 class="text-3xl font-bold text-center">Welcome to SvelteKit UI Components</h1>

	<!-- 按钮 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">按钮</h2>
		<div class="mt-3 flex flex-wrap gap-4 items-center">
			<Button variant="primary">Primary Button</Button>
			<Button variant="primary" rounded>Rounded Button</Button>
			<Button variant="primary" disabled>Disabled Primary Button</Button>
			<Button variant="outline">Outline Button</Button>
			<Button variant="success">Success Button</Button>
			<Button variant="danger">Danger Button</Button>
			<Button variant="link">Link Button</Button>
			<Button variant="plain">Plain Button</Button>
			<Button variant="warning">Warning Button</Button>
		</div>
	</div>

	<!-- 输入框 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">输入框</h2>
		<div class="mt-3 flex flex-wrap gap-4 items-center">
			<Input placeholder="小写转大写" onFormat={(v) => v.toLocaleUpperCase()} />
			<Input placeholder="圆形" rounded />
			<Input placeholder="禁用" disabled />
		</div>
	</div>

	<!-- 弹窗 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">弹窗</h2>
		<div class="mt-3 flex flex-wrap gap-4 items-center">
			<Button variant="primary" onclick={() => (dialogOpenOuter = true)}>打开弹窗</Button>
			<Dialog open={dialogOpenOuter} title="这是一个弹窗" onClose={() => (dialogOpenOuter = false)}>
				<Button variant="primary" onclick={() => (dialogOpenInner = true)}>打开嵌套弹窗</Button>

				<Dialog
					open={dialogOpenInner}
					title="这是一个嵌套弹窗"
					width={400}
					height={300}
					onClose={() => (dialogOpenInner = false)}
				>
					<p>这是一个嵌套弹窗的内容。</p>
				</Dialog>
			</Dialog>

			<Button variant="danger" onclick={() => handleConfirm('error')}
				>这是一个命令式删除确认弹窗</Button
			>
			<Button variant="primary" onclick={() => handleConfirm('primary')}
				>这是一个命令式确认弹窗</Button
			>
			<Button variant="warning" onclick={() => handleConfirm('warning')}
				>这是一个命令式警告弹窗</Button
			>
		</div>
	</div>
</main>
