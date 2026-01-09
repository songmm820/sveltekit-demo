<script lang="ts">
	import { fade } from 'svelte/transition';
	import Input from '$/lib/components/input/Input.svelte';
	import Modal from '$/lib/components/dialog/Dialog.svelte';
	import { Button } from '$/lib/components/button';

	let counter = $state<number>(0);

	let inputValue = $state<string>('123');

	let open = $state<boolean>(false);

	let inputEl: Input;

	function add() {
		counter++;
	}
</script>

<main transition:fade class="p-6 flex flex-col gap-12">
	<h1 class="text-3xl font-bold text-center">Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<p>Counter: {counter}</p>
	<!-- <button class="font-bold text-lg my-button" onclick={add}> ADD</button> -->

	<Button variant="primary">Primary Button</Button>
	<Button variant="primary" disabled>Disabled Primary Button</Button>
	<Button variant="outline">Outline Button</Button>
	<Button variant="success">Success Button</Button>
	<Button variant="danger">Danger Button</Button>

	<div>
		<Button variant="link">Link Button</Button>
		123
	</div>

	<Button onclick={add}>Add Counter</Button>

	<Input bind:value={inputValue} placeholder="请输入" onFormat={(v) => v.toLocaleUpperCase()} />

	<Button onclick={() => (open = true)}>Open Modal</Button>

	<Modal bind:open>123123</Modal>

	<enhanced:img src="$lib/assets/favicon.svg" alt="An alt text" />
</main>
