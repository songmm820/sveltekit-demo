<script lang="ts">
	import { fade } from 'svelte/transition';
	import Input from '$/lib/components/input/Input.svelte';
	import Modal from '$/lib/components/dialog/Dialog.svelte';
	import { Button } from '$/lib/components/button';
	import { useScrollBottom } from '$/lib/hooks';
	import debounce from '$/lib/utils/debounce';

	let inputValue = $state<string>('123');

	let open = $state<boolean>(false);

	const handleReachBottom = () => {
		// console.log('reach bottom');
	};

	const debounceOnReachBottom = debounce(handleReachBottom, 500);

	useScrollBottom(() => document, {
		threshold: 0,
		onReachBottom: debounceOnReachBottom
	});
</script>

<main transition:fade class="bg-(--color-bg) p-6 flex flex-col gap-12">
	<h1 class="text-3xl font-bold text-center">Welcome to SvelteKit</h1>

	<Button variant="primary">Primary Button</Button>
	<Button variant="primary" disabled>Disabled Primary Button</Button>
	<Button variant="outline">Outline Button</Button>
	<Button variant="success">Success Button</Button>
	<Button variant="danger">Danger Button</Button>

	<div>
		<Button variant="link">Link Button</Button>
		123
	</div>

	<Input bind:value={inputValue} placeholder="请输入" onFormat={(v) => v.toLocaleUpperCase()} />

	<Button onclick={() => (open = true)}>Open Modal</Button>

	<Modal bind:open>123123</Modal>
</main>
