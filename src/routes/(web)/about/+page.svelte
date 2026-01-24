<script lang="ts">
	import alovaInstance from '$lib/request/alova';
	import { useRequest } from 'alova/client';

	const { loading, data, error, send } = useRequest(
		alovaInstance.Get('/todos/1', {
			cacheFor: 0
		}),
		{
			initialData: {}, // 设置data状态的初始数据
			immediate: true // 是否立即发送请求，默认为true
		}
	).onSuccess(() => {});

	function getHelloWorld() {
		send();
	}

	$effect(() => {
		getHelloWorld();
	});
</script>

<main class="flex size-full flex-col items-center justify-center">
	<h1>关于</h1>

	{loading ? '加载中' : JSON.stringify(data)}
	{error ? '请求失败' : ''}
</main>
