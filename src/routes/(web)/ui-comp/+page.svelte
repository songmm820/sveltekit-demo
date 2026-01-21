<script lang="ts">
	import debounce from '$lib/utils/debounce';
	import Input from '$lib/components/input/Input.svelte';
	import useScrollBottom from '$lib/hooks/use-scroll-bottom.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import SvelteMessageBox, { type ConfirmOptions } from '$lib/components/message-box';
	import { ThemeEnum, useThemeContext } from '$lib/hooks/use-theme.svelte';
	import Image from '$lib/components/image/Image.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import FloatElement from '$lib/components/float-element/FloatElement.svelte';
	import useEventListener from '$lib/hooks/use-event-listener.svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/button/Button.svelte';

	const handleReachBottom = () => {
		// console.log('reach bottom');
	};

	const themeCtx = useThemeContext();

	let dialogOpenOuter: boolean = $state(false);
	let dialogOpenInner: boolean = $state(false);

	const debounceOnReachBottom = debounce(handleReachBottom, 500);

	const handleConfirm = (options: ConfirmOptions) => {
		SvelteMessageBox.confirm({
			...options
		});
	};

	const handleInput = () => {
		SvelteMessageBox.input({
			title: '请输入您的姓名',
			placeholder: '请输入您的姓名',
			message: '提示：姓名不能包含特殊字符，只能包含字母、数字和下划线。',
			onConfirm: async (value: string) => {
				// 延迟3秒模拟异步操作
				if (!value) {
					SvelteMessageBox.toast({
						message: '请输入姓名',
						status: 'error'
					});
					return Promise.reject('请输入姓名');
				}
				await new Promise((resolve) => setTimeout(resolve, 3000));
				// 返回true或者false，根据实际情况判断是否关闭弹窗
			},
			onCancel: () => {}
		});
	};

	const handleToast = (
		position: 'top' | 'bottom' | 'center',
		message: string,
		description?: string,
		status?: 'success' | 'error' | 'info' | 'warning'
	) => {
		SvelteMessageBox.toast({
			position: position,
			message: message,
			status: status,
			description: description
		});
	};

	let floatElementOpen: boolean = $state(false);

	if (browser) {
		useEventListener(
			document,
			'scroll',
			() => {
				const scrollTop = document.documentElement.scrollTop;
				if (scrollTop > 200) {
					floatElementOpen = true;
				} else {
					floatElementOpen = false;
				}
			},
			{
				immediate: true
			}
		);
	}

	function scrollToTop() {
		// 平滑滚动到顶部
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	useScrollBottom(() => document, {
		threshold: 0,
		onReachBottom: debounceOnReachBottom
	});
</script>

<main class="h-full w-full p-6">
	<h1 class="text-center text-3xl font-bold">Welcome to SvelteKit UI Components</h1>

	<!-- 亮色|暗色模式 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">亮色|暗色模式</h2>
		<div class="mt-3 flex flex-wrap items-center gap-4">
			<Button variant="primary" onclick={() => themeCtx?.setTheme(ThemeEnum.LIGHT)}
				>Change Light Theme
			</Button>
			<Button variant="plain" onclick={() => themeCtx?.setTheme(ThemeEnum.DARK)}
				>Change Dark Theme
			</Button>
		</div>
	</div>

	<!-- 按钮 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">按钮</h2>
		<div class="mt-3 flex flex-wrap items-center gap-4">
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
		<div class="mt-3 flex flex-wrap items-center gap-4">
			<Input placeholder="小写转大写" onFormat={(v) => v.toLocaleUpperCase()} />
			<Input placeholder="圆形" rounded />
			<Input placeholder="禁用" disabled />
			<Input placeholder="自动聚焦" autofocus />
		</div>
	</div>

	<!-- 弹窗 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">弹窗</h2>
		<div class="mt-3 flex flex-wrap items-center gap-4">
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
					<Button variant="primary" onclick={() => handleToast('center', '这是一个土司')}
						>显示土司
					</Button>
				</Dialog>
			</Dialog>

			<Button
				variant="danger"
				onclick={() =>
					handleConfirm({
						type: 'error',
						title: '删除确认',
						message: '确定要删除吗？真的要删除吗？删除后无法恢复！',
						onConfirm: async () => {
							// 延迟3秒模拟异步操作
							await new Promise((resolve) => setTimeout(resolve, 3000));
						}
					})}
				>这是一个命令式删除确认弹窗
			</Button>
			<Button
				variant="primary"
				onclick={() =>
					handleConfirm({
						type: 'primary'
					})}
				>这是一个命令式确认弹窗
			</Button>
			<Button
				variant="warning"
				onclick={() =>
					handleConfirm({
						type: 'warning',
						cancelText: null
					})}
			>
				没有取消按钮
			</Button>
			<Button variant="primary" onclick={() => handleInput()}>这是一个输入框弹窗</Button>
		</div>
	</div>

	<!-- 土司 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">土司</h2>
		<div class="mt-3 flex flex-wrap items-center gap-4">
			<Button variant="primary" onclick={() => handleToast('top', '上方土司')}>显示土司</Button>
			<Button variant="primary" onclick={() => handleToast('bottom', '下方土司')}>显示土司</Button>
			<Button
				variant="primary"
				onclick={() => handleToast('center', '中心土司', '这是一个中心土司的描述', 'success')}
			>
				显示土司，包含描述
			</Button>
		</div>
	</div>

	<!-- 图片 -->
	<div class="my-4 p-2">
		<h2 class="text-2xl font-bold">图片</h2>
		<div class="mt-3 flex flex-wrap items-center gap-4">
			<Image src={favicon} alt="SvelteKit" />
		</div>
	</div>

	<!-- 浮动元素 -->
	<FloatElement open={floatElementOpen} position="bottom-right">
		<Button class="rounded-full" variant="primary" onclick={() => scrollToTop()}>返回顶部</Button>
	</FloatElement>
</main>
