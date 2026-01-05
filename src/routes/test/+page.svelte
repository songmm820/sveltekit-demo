<script lang="ts">
	import Button from '$/lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import type { Action } from 'svelte/action';
	import { onDestroy, onMount } from 'svelte';
	import Input from '$/lib/components/Input.svelte';

	let counter = $state<number>(0);

	let inputValue = $state<string>('');

	const a = 1;
	debugger;

	function add() {
		debugger;
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

<main transition:fade class="p-6 flex flex-col gap-12" use:myAction={'hello, world'}>
	<h1 class="text-3xl font-bold text-center text-gray-800">Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<p>Counter: {counter}</p>
	<!-- <button class="font-bold text-lg my-button" onclick={add}> ADD</button> -->

	<Button onclick={add}>Add Counter</Button>

	<Button disabled onclick={add}>Add Counter</Button>

	<Input bind:value={inputValue} placeholder="请输入" format={(v) => v.toLocaleUpperCase()}>
		{#snippet prefix()}
			<span>before</span>
		{/snippet}

		{#snippet suffix()}
			<span>after</span>
		{/snippet}
	</Input>

	<Input bind:value={inputValue} placeholder="请输入" format={(v) => v.toLocaleUpperCase()}></Input>
</main>

<style lang="css">
</style>
