<script lang="ts">
	import { Button } from '$lib/components/button';
	import debounce from '$lib/utils/debounce';
	import Input from '$lib/components/input/Input.svelte';
	import useScrollBottom from '$lib/hooks/use-scroll-bottom.svelte';

	const handleReachBottom = () => {
		// console.log('reach bottom');
	};

	const debounceOnReachBottom = debounce(handleReachBottom, 500);

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
</main>
