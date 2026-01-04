<script lang="ts">
	let counter = $state<number>(0);

	function add() {
		counter++;
	}

	// 监听counter变化时
	$effect(() => {
		console.log('组件挂载到客户端 DOM 了！');
		console.log('counter changed', counter);

		return () => {
			console.log('组件销毁了！');
		};
	});
</script>

<h1 class="text-3xl font-bold text-center text-gray-800">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>Counter: {counter}</p>
<button class="font-bold text-lg my-button" onclick={add}> ADD </button>

<style lang="css">
	@reference '#app.css';
	.my-button {
		@apply bg-blue-500 text-white px-4 py-2 rounded-md;
	}
</style>
