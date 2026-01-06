<script lang="ts">
	import { fade } from 'svelte/transition';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let counter = $state<number>(0);

	let inputValue = $state<string>('');

	function add() {
		counter++;
	}
</script>

<main transition:fade class="p-6 flex flex-col gap-12">
	<h1 class="text-3xl font-bold text-center text-gray-800">Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<p>Counter: {counter}</p>
	<!-- <button class="font-bold text-lg my-button" onclick={add}> ADD</button> -->

	<Button onclick={add}>Add Counter</Button>

	<Button disabled onclick={add}>Add Counter</Button>

	<Input bind:value={inputValue} placeholder="请输入" on-format={(v) => v.toLocaleUpperCase()}>
		{#snippet prefix()}
			<span>before</span>
		{/snippet}

		{#snippet suffix()}
			<span>after</span>
		{/snippet}
	</Input>

	<Input bind:value={inputValue} placeholder="请输入" on-format={(v) => v.toLocaleUpperCase()}
	></Input>
</main>
