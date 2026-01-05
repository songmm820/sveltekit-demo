<script lang="ts">
	import Button from '$/lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import type { Action } from 'svelte/action';
	import { onDestroy, onMount } from 'svelte';

	let counter = $state<number>(0);

	function add() {
		counter++;
	}

	const myAction: Action<HTMLElement, string> = (node, data) => {
		console.log('myAction 被调用了！', node, data);
	};

	async function goToAboutPage() {
		await goto(resolve('/about'));
		console.log('已经跳转到了/about页面');
	}

	// 监听counter变化时
	$effect(() => {
		console.log('counter changed', counter);
	});

	onMount(() => {
		console.log('组件挂载到客户端 DOM 了！');
	});

	onDestroy(() => {
		console.log('组件销毁了！');
	});
</script>

<main transition:fade class="p-6" use:myAction={'hello, world'}>
	<h1 class="text-3xl font-bold text-center text-gray-800">Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<p>Counter: {counter}</p>
	<!-- <button class="font-bold text-lg my-button" onclick={add}> ADD</button> -->

	<Button onclick={add}>Add Counter</Button>

	<br />
</main>

<style lang="css">
</style>
